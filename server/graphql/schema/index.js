/* Entry point for GraphQL */
import mongoose from 'mongoose';
import DataModel from '../../config/models/data_model';
import fetchAPI from '../../pi/piFetchers';
import {DataPoint, BuildingData, SensorData, StreamType} from './classes';

const db = mongoose.connection;

import {
    buildSchema
} from 'graphql';

let schema = buildSchema(`

    type DataPoint {
        Timestamp        : String,
        Value            : Float,
        UnitsAbbreviation: String,
        Good             : Boolean,
        Questionable     : Boolean,
        Substituted      : Boolean
    }

    type StreamType {
        building       : String,
        equipmentType  : String,
        equipmentNumber: String,
        sensorType     : String,
        stream         : [DataPoint]
    }

    type Coord {
        long: Float
        lat : Float
    }

    type BuildingData {
        bldgKey         : [String],
        nameTag         : String,
        buildingType    : String,
        center          : Coord,
        primaryPercent  : String,
        primaryUse      : String,
        secondaryPercent: String,
        secondaryUse    : String,
        active          : Boolean,
    }

    type SensorData {
        webId          : String,
        tagName        : String,
        building       : String,
        equipmentType  : String,
        equipmentNumber: String,
        sensorType     : String,
    }

    type Query {
        dataByMonths
        (
            building       : String,
            equipmentType  : String,
            equipmentNumber: String,
            sensorType     : String,
            startDate      : String,
            endDate        : String,
            interval       : String
        ): [DataPoint],

        dataByMinutes
        (
            building       : String,
            equipmentType  : String,
            equipmentNumber: String,
            sensorType     : String,
            startTime      : String,
            endTime        : String,
            interval       : String
        ): [StreamType],

        latestSummary
        (
            building: String,
            equipmentType: String,
            equipmentNumber: String,
            sensorType: String,
        ): DataPoint,

        buildingData(building: String): BuildingData,

        sensorData
        (
            building: String,
            equipmentType: String,
            equipmentNumber: String,
            sensorType: String,
        ): [SensorData]

        sensorFilter
        (
            building: String,
            equipmentType: String,
            equipmentNumber: String,
            sensorType: String,
        ): [SensorData]
    }

`);

// The root provides the top-level API endpoints
var root = {

    dataByMonths: async function ({building, equipmentType, equipmentNumber, sensorType, startDate, endDate, interval}) {
        const dbEntry = {
            "building": building,
            "equipmentType": equipmentType,
            "equipmentNumber": equipmentNumber,
            "sensorType": sensorType
        };
        const dbResult = await DataModel.findOne(dbEntry);
        var piResult = await fetchAPI.fetchStream_byMonths(dbResult.webId,
                                                             startDate,
                                                             endDate,
                                                             interval );
        var listOfPoints = [];
        (piResult.Items).forEach( function(element) {
            const point = new DataPoint(element.Timestamp, element.Value, element.UnitsAbbreviation, element.Good, element.Questionable, element.Substituted);
            listOfPoints.push(point);
        });
        return listOfPoints;
    },

    dataByMinutes: async function ({building, equipmentType, equipmentNumber, sensorType, startTime, endTime, interval}) {
        var dbQuery = {}
        // Example Query that we want to construct:
            // "$and": [
            //     {"building": "ACAD"},
            //     {"equipmentType": "AHU"},
            //     {"$or": [
            //         {"sensorType": "Building Static Pressure"},
            //         {"sensorType": "Supply Air Fan Start/Stop"}
            //     ]}
            // ],
            // "$or": [
            //     {"equipmentNumber": "AHU01"},
            //     {"equipmentNumber": "AHU03"}
            // ]
        var andList = [{"building": building}, {"equipmentType": equipmentType}];
        var andOrField = {}
        var andOrList = [];
        sensorType.split(',').forEach(function(element) {
            const andOrEntry = {"sensorType": element}
            andOrList.push(andOrEntry);
        });
        andOrField["$or"] = andOrList;
        andList.push(andOrField);
        var orList = [];
        equipmentNumber.split(',').forEach(function(element) {
            const orEntry = {"equipmentNumber": element}
            orList.push(orEntry);
        });
        dbQuery["$and"] = andList;
        dbQuery["$or"] = orList;
        console.log(dbQuery);
        // At this point we have constructed the query. Now, use it to query the db.
        const dbResult = await DataModel.find(dbQuery);
        console.log(dbResult);
        // Get the data stream for each webID and format the result.
        var streamList = [];
        for(var i = 0; i < dbResult.length; i++) {
            var piResult = await fetchAPI.fetchStream_byMinutes(dbResult[i].webId,
                                                                 startTime,
                                                                 endTime,
                                                                 interval );
            var stream = [];
            (piResult.Items).forEach(function(element) {
                if (element.Good === false) {
                    element.Value = null;
                }
                const point = new DataPoint(element.Timestamp, element.Value, element.UnitsAbbreviation, element.Good, element.Questionable, element.Substituted);
                stream.push(point);
            });
            console.log(stream);
            var streamObject = new StreamType(dbResult[i].building, dbResult[i].equipmentNumber, dbResult[i].equipmentType, dbResult[i].sensorType, stream);
            streamList.push(streamObject);
        }
        return streamList;
    },

    latestSummary: async function ({building, equipmentType, equipmentNumber, sensorType}) {
        const dbEntry = {
            "building": building,
            "equipmentType": equipmentType,
            "equipmentNumber": equipmentNumber,
            "sensorType": sensorType
        };
        const dbResult = await DataModel.findOne(dbEntry);
        var piResult = await fetchAPI.fetchStream_value(dbResult.webId);
        const point = new DataPoint(piResult.Timestamp, piResult.Value, piResult.UnitsAbbreviation, piResult.Good, piResult.Questionable, piResult.Substituted);
        return point;
    },

    buildingData: async function ({building}) {
        const dbEntry = {
            "nameTag": building,
        };
        const cursor = db.collection("buildings").find(dbEntry);
        let dbResult = await cursor.next();
        const bData = new BuildingData(dbResult.bldgKey, dbResult.nameTag, dbResult.buildingType, dbResult.center.long, dbResult.center.lat, dbResult.primaryPercent, dbResult.primaryUse, dbResult.secondaryPercent, dbResult.secondaryUse, dbResult.active);
        return bData;
    },

    sensorData: async function ({building, equipmentType, equipmentNumber, sensorType}) {
        const dbEntry = {};
        if((typeof building !== "undefined") && (building != null)) {
            dbEntry["building"] = building;
        }
        if((typeof equipmentType !== "undefined") && (equipmentType != null)) {
            dbEntry["equipmentType"] = equipmentType;
        }
        if((typeof equipmentNumber !== "undefined") && (equipmentNumber != null)) {
            dbEntry["equipmentNumber"] = equipmentNumber;
        }
        if((typeof sensorType !== "undefined") && (sensorType != null)) {
            dbEntry["sensorType"] = sensorType;
        }
        const results = await DataModel.find(dbEntry);
        var listOfData = [];
        (results).forEach( function(element) {
            const sData = new SensorData(element.webId, element.tagName, element.building, element.equipmentType, element.equipmentNumber, element.sensorType);
            listOfData.push(sData);
        });
        return listOfData;
    },

    sensorFilter: async function ({building, equipmentType, equipmentNumber, sensorType}) {
        var dbQuery = {};
        // Example Query that we want to construct:
            // "$and": [
            //     {"building": "ACAD"},
            //     {"equipmentType": "AHU"},
            // ],
            // "$or": [
            //     {"equipmentNumber": "AHU01"},
            //     {"equipmentNumber": "AHU03"}
            // ]
        var andList = [{"building": building}, {"equipmentType": equipmentType}];
        var orList = [];
        equipmentNumber.split(',').forEach(function(element) {
            const orEntry = {"equipmentNumber": element}
            orList.push(orEntry);
        });
        dbQuery["$and"] = andList;
        dbQuery["$or"] = orList;
        console.log(dbQuery);
        // At this point we have constructed the query. Now, use it to query the db.
        const dbResult = await DataModel.find(dbQuery);
        console.log(dbResult);

        var listOfData = [];
        (dbResult).forEach(function(element) {
            const sData = new SensorData(element.webId, element.tagName, element.building, element.equipmentType, element.equipmentNumber, element.sensorType);
            listOfData.push(sData);
        });
        return listOfData;
    },

};

export { schema, root };
