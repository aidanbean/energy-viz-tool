/* Entry point for GraphQL */

/* NOTE: Trying a different implementation .  Ignore "query.js" and ./types
 * folder for this implementation
 */
import mongoose from 'mongoose';
import DataModel from '../../config/models/data_model';
import BuildingModel from '../../config/models/building_model';
import fetchAPI from '../../pi/piFetchers';
import {DataPoint, Coord, BuildingData, SensorData} from './classes';

const db = mongoose.connection;

import {
    graphql,
    buildSchema
} from 'graphql';

var schema = buildSchema(`

    type DataPoint {
        Timestamp:String,
        Value: Float,
        UnitsAbbreviation: String,
        Good: Boolean,
        Questionable: Boolean,
        Substituted: Boolean
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
        ): [DataPoint],

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
        console.log(dbEntry);
        const dbResult = await DataModel.findOne(dbEntry);
        console.log("WebId just fetched:");
        console.log(dbResult.webId);
        var piResult = await fetchAPI.fetchStream_byMonths(dbResult.webId,
                                                             startDate,
                                                             endDate,
                                                             interval );
        console.log(piResult.Items);
        var listOfPoints = [];
        (piResult.Items).forEach( function(element) {
            const point = new DataPoint(element.Timestamp, element.Value, element.UnitsAbbreviation, element.Good, element.Questionable, element.Substituted);
            listOfPoints.push(point);
        });
        return listOfPoints;
    },

    dataByMinutes: async function ({building, equipmentType, equipmentNumber, sensorType, startTime, endTime, interval}) {
        const dbEntry = {
            "building": building,
            "equipmentType": equipmentType,
            "equipmentNumber": equipmentNumber,
            "sensorType": sensorType
        };
        console.log(dbEntry);
        const dbResult = await DataModel.findOne(dbEntry);
        console.log("WebId just fetched:");
        console.log(dbResult.webId);
        var piResult = await fetchAPI.fetchStream_byMinutes(dbResult.webId,
                                                             startTime,
                                                             endTime,
                                                             interval );
        console.log(piResult.Items);
        var listOfPoints = [];
        (piResult.Items).forEach( function(element) {
            if (element.Good == false) {
                element.Value = null;
            }
            const point = new DataPoint(element.Timestamp, element.Value, element.UnitsAbbreviation, element.Good, element.Questionable, element.Substituted);
            listOfPoints.push(point);
        });
        return listOfPoints;
    },

    latestSummary: async function ({building, equipmentType, equipmentNumber, sensorType}) {
        const dbEntry = {
            "building": building,
            "equipmentType": equipmentType,
            "equipmentNumber": equipmentNumber,
            "sensorType": sensorType
        };
        console.log(dbEntry);
        const dbResult = await DataModel.findOne(dbEntry);
        console.log("WebId just fetched:");
        console.log(dbResult.webId);
        var piResult = await fetchAPI.fetchStream_value(dbResult.webId);
        console.log(piResult);
        const point = new DataPoint(piResult.Timestamp, piResult.Value, piResult.UnitsAbbreviation, piResult.Good, piResult.Questionable, piResult.Substituted);
        return point;
    },

    buildingData: async function ({building}) {
        const dbEntry = {
            "nameTag": building,
        };
        console.log(dbEntry);
        const cursor = db.collection("buildings").find(dbEntry);
        let dbResult = await cursor.next();
        // console.log(dbResult);
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
        console.log(dbEntry);
        const cursor = db.collection("good_data").find(dbEntry);
        const results = await DataModel.find(dbEntry);
        // let dbResult = await cursor.next();
        console.log(results);
        var listOfData = [];
        (results).forEach( function(element) {
            const sData = new SensorData(element.webId, element.tagName, element.building, element.equipmentType, element.equipmentNumber, element.sensorType);
            listOfData.push(sData);
        });
        return listOfData;
    },
}

export { schema, root };
