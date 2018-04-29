/* Entry point for GraphQL */
import mongoose from "mongoose";
import DataModel from "../../config/models/data_model";
import fetchAPI from "../../pi/piFetchers";
import {
  DataPoint,
  BuildingData,
  SensorData,
  StreamType,
  FilterType,
  SummaryData
} from "./classes";

const db = mongoose.connection;

import { buildSchema } from "graphql";

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
    
    type SummaryData {
        Type: String,
        Value:  DataPoint
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

    type FilterType {
        buildings       : [String],
        equipmentTypes  : [String],
        equipmentNumbers: [String],
        sensorTypes     : [String],
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

        dataStream
        (
            building       : String,
            equipmentType  : String,
            equipmentNumber: String,
            sensorType     : String,
            startTime      : String,
            endTime        : String,
            interval       : String
        ): [StreamType],

        selectBuilding
        (
            building       : String,
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
        ): [SummaryData],

        buildingData(building: String): BuildingData,

        searchFilter
        (
            building: String,
            equipmentType: String,
            equipmentNumber: String,
            sensorType: String
        ): FilterType
    }

`);

// The root provides the top-level API endpoints
var root = {
  dataByMonths: async function({
    building,
    equipmentType,
    equipmentNumber,
    sensorType,
    startDate,
    endDate,
    interval
  }) {
    const dbEntry = {
      building: building,
      equipmentType: equipmentType,
      equipmentNumber: equipmentNumber,
      sensorType: sensorType
    };
    const dbResult = await DataModel.findOne(dbEntry);
    var piResult = await fetchAPI.fetchStream_byMonths(
      dbResult.webId,
      startDate,
      endDate,
      interval
    );
    var listOfPoints = [];
    piResult.Items.forEach(function(element) {
      const point = new DataPoint(
        element.Timestamp,
        element.Value,
        element.UnitsAbbreviation,
        element.Good,
        element.Questionable,
        element.Substituted
      );
      listOfPoints.push(point);
    });
    return listOfPoints;
  },

  dataStream: async function({
    building,
    equipmentType,
    equipmentNumber,
    sensorType,
    startTime,
    endTime,
    interval
  }) {
    // Example Query that we want to construct:
    // "$and": [
    //     {"$or": [
    //         {"building": "ACAD"},
    //         {"sensorType": "PH_GEO"}
    //     ]},
    //     {"$or": [
    //         {"equipmentType": "AHU"},
    //         {"equipmentType": "CHW"}
    //     ]},
    //     {"$or": [
    //         {"equipmentNumber": "AHU01"},
    //         {"equipmentNumber": "AHU02"}
    //     ]},
    //     {"$or": [
    //         {"sensorType": "Building Static Pressure"},
    //         {"sensorType": "Supply Air Fan Start/Stop"}
    //     ]}
    // ]
    var query = [];
    var buildingList = [];
    var equipTypeList = [];
    var equipNumList = [];
    var sensorTypeList = [];
    if (typeof building !== "undefined" && building != null) {
      building.split(",").forEach(function(element) {
        const listEntry = { building: element };
        buildingList.push(listEntry);
      });
      query.push({ $or: buildingList });
    }
    if (typeof equipmentType !== "undefined" && equipmentType != null) {
      equipmentType.split(",").forEach(function(element) {
        const listEntry = { equipmentType: element };
        equipTypeList.push(listEntry);
        // if(element == "CCW" || element == "HHW") {
        //     equipNumList.push({"equipmentNumber": ""});
        // }
      });
      query.push({ $or: equipTypeList });
    }
    if (typeof equipmentNumber !== "undefined" && equipmentNumber != null) {
      equipmentNumber.split(",").forEach(function(element) {
        const listEntry = { equipmentNumber: element };
        equipNumList.push(listEntry);
      });
      query.push({ $or: equipNumList });
    }
    if (typeof sensorType !== "undefined" && sensorType != null) {
      sensorType.split(",").forEach(function(element) {
        const listEntry = { sensorType: element };
        sensorTypeList.push(listEntry);
      });
      query.push({ $or: sensorTypeList });
    }
    var finalQuery = {};
    if (query.length != 0) {
      finalQuery = { $and: query };
    }
    // console.log(finalQuery);
    const dbResult = await DataModel.find(finalQuery);
    console.log(dbResult);
    var streamList = [];
    for (var i = 0; i < dbResult.length; i++) {
      var piResult = await fetchAPI.fetchStream_byMinutes(
        dbResult[i].webId,
        startTime,
        endTime,
        interval
      );
      var stream = [];
      piResult.Items.forEach(function(element) {
        if (element.Good === false) {
          element.Value = null;
        }
        const point = new DataPoint(
          element.Timestamp,
          element.Value,
          element.UnitsAbbreviation,
          element.Good,
          element.Questionable,
          element.Substituted
        );
        stream.push(point);
      });
      // console.log(stream);
      var streamObject = new StreamType(
        dbResult[i].building,
        dbResult[i].equipmentNumber,
        dbResult[i].equipmentType,
        dbResult[i].sensorType,
        stream
      );
      streamList.push(streamObject);
    }
    return streamList;
  },

  selectBuilding: async function({
    building,
    sensorType,
    startTime,
    endTime,
    interval
  }) {
    var query = {};
    var buildingList = [];
    if (typeof building !== "undefined" && building != null) {
      building.split(",").forEach(function(element) {
        const listEntry = { building: element };
        buildingList.push(listEntry);
      });
      query = { $or: buildingList };
    }
    const buildings = await DataModel.distinct("building", {
      $and: [query, { equipmentType: "AHU" }]
    });
    var streamQueries = [];
    for (const i in buildings) {
      const equipNums = await DataModel.distinct("equipmentNumber", {
        $and: [{ building: buildings[i] }, { equipmentType: "AHU" }]
      });
      for (const j in equipNums) {
        var dbQuery = {
          $and: [
            { building: buildings[i] },
            { equipmentType: "AHU" },
            { equipmentNumber: equipNums[j] }
          ]
        };
        var sensorList = [];
        sensorType.split(",").forEach(function(element) {
          const sensor = { sensorType: element };
          sensorList.push(sensor);
        });
        dbQuery["$or"] = sensorList;
        console.log(dbQuery);
        const dbResult = await DataModel.find(dbQuery).sort({ sensorType: 1 });
        console.log(dbResult);
        if (dbResult.length != 2) {
          continue;
        } else {
          streamQueries.push(dbResult[0]);
          streamQueries.push(dbResult[1]);
        }
      }
    }
    var streamList = [];
    for (var i = 0; i < streamQueries.length; i++) {
      var piResult = await fetchAPI.fetchStream_byMinutes(
        streamQueries[i].webId,
        startTime,
        endTime,
        interval
      );
      var stream = [];
      piResult.Items.forEach(function(element) {
        if (element.Good === false) {
          element.Value = null;
        }
        const point = new DataPoint(
          element.Timestamp,
          element.Value,
          element.UnitsAbbreviation,
          element.Good,
          element.Questionable,
          element.Substituted
        );
        stream.push(point);
      });

      var streamObject = new StreamType(
        streamQueries[i].building,
        streamQueries[i].equipmentNumber,
        streamQueries[i].equipmentType,
        streamQueries[i].sensorType,
        stream
      );
      streamList.push(streamObject);
    }
    return streamList;
  },

  latestSummary: async function({
    building,
    equipmentType,
    equipmentNumber,
    sensorType
  }) {
    const dbEntry = {
      building: building,
      equipmentType: equipmentType,
      equipmentNumber: equipmentNumber,
      sensorType: sensorType
    };
    const dbResult = await DataModel.findOne(dbEntry);
    const piResult = await fetchAPI.fetchStream_summary_AllType(dbResult.webId);
    console.log(dbResult.webId);
    var summaryDataList = [];
    for (var summaryData in piResult) {
      var eachDataPoint = piResult[summaryData].Value;
      if (eachDataPoint.Good) {
        var dataPoint = new DataPoint(
          eachDataPoint.Timestamp,
          eachDataPoint.Value,
          eachDataPoint.UnitsAbbreviation,
          eachDataPoint.Good,
          eachDataPoint.Questionable,
          eachDataPoint.Substituted
        );
        var point = new SummaryData(piResult[summaryData].Type, dataPoint);
        summaryDataList.push(point);
      }
    }
    return summaryDataList;
  },

  buildingData: async function({ building }) {
    const dbEntry = {
      nameTag: building
    };
    const cursor = db.collection("buildings").find(dbEntry);
    let dbResult = await cursor.next();
    const bData = new BuildingData(
      dbResult.bldgKey,
      dbResult.nameTag,
      dbResult.buildingType,
      dbResult.center.long,
      dbResult.center.lat,
      dbResult.primaryPercent,
      dbResult.primaryUse,
      dbResult.secondaryPercent,
      dbResult.secondaryUse,
      dbResult.active
    );
    return bData;
  },

  searchFilter: async function({
    building,
    equipmentType,
    equipmentNumber,
    sensorType
  }) {
    var query = [];
    var buildingList = [];
    var equipTypeList = [];
    var equipNumList = [];
    var sensorTypeList = [];
    if (typeof building !== "undefined" && building != null) {
      building.split(",").forEach(function(element) {
        const listEntry = { building: element };
        buildingList.push(listEntry);
      });
      query.push({ $or: buildingList });
    }
    if (typeof equipmentType !== "undefined" && equipmentType != null) {
      equipmentType.split(",").forEach(function(element) {
        const listEntry = { equipmentType: element };
        equipTypeList.push(listEntry);
        // if(element == "CCW" || element == "HHW") {
        //     equipNumList.push({"equipmentNumber": ""});
        // }
      });
      query.push({ $or: equipTypeList });
    }
    if (typeof equipmentNumber !== "undefined" && equipmentNumber != null) {
      equipmentNumber.split(",").forEach(function(element) {
        const listEntry = { equipmentNumber: element };
        equipNumList.push(listEntry);
      });
      query.push({ $or: equipNumList });
    }
    if (typeof sensorType !== "undefined" && sensorType != null) {
      sensorType.split(",").forEach(function(element) {
        const listEntry = { sensorType: element };
        sensorTypeList.push(listEntry);
      });
      query.push({ $or: sensorTypeList });
    }
    // console.log(query);
    var finalQuery = {};
    if (query.length != 0) {
      finalQuery = { $and: query };
    }
    const buildings = await DataModel.distinct("building", finalQuery);
    const equipmentTypes = await DataModel.distinct(
      "equipmentType",
      finalQuery
    );
    const equipmentNumbers = await DataModel.distinct(
      "equipmentNumber",
      finalQuery
    );
    const sensorTypes = await DataModel.distinct("sensorType", finalQuery);
    const result = new FilterType(
      buildings,
      equipmentTypes,
      equipmentNumbers,
      sensorTypes
    );
    // console.log(result);
    return result;
  }
};

export { schema, root };
