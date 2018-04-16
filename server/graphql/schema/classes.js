/**
 * These class implement the different GraphQL types
 */

class DataPoint {
    constructor(Timestamp, Value, UnitsAbbreviation, Good, Questionable, Substituted) {
        this.Timestamp = Timestamp;
        this.Value = Value;
        this.UnitsAbbreviation = UnitsAbbreviation;
        this.Good = Good;
        this.Questionable = Questionable;
        this.Substituted = Substituted;
    }
}

class StreamType {
    constructor(building, equipmentNumber, equipmentType, sensorType, stream) {
        this.building = building;
        this.equipmentType = equipmentType;
        this.equipmentNumber = equipmentNumber;
        this.sensorType = sensorType;
        this.stream = stream;
    }
}

class Coord {
    constructor(long, lat) {
        this.long = long;
        this.lat = lat;
    }
}

class BuildingData {
     constructor(bldgKey, nameTag, buildingType, long, lat, primaryPercent, primaryUse, secondaryPercent, secondaryUse, active) {
         this.bldgKey = bldgKey;
         this.nameTag = nameTag;
         this.buildingType = buildingType;
         this.center = new Coord(long, lat);
         this.primaryPercent = primaryPercent;
         this.primaryUse = primaryUse;
         this.secondaryPercent = secondaryPercent;
         this.secondaryUse = secondaryUse;
         this.active = active;

     }
}

class SensorData {
    constructor(webId, tagName, building, equipmentType, equipmentNumber, sensorType) {
        this.webId = webId;
        this.tagName = tagName;
        this.building = building;
        this.equipmentType = equipmentType;
        this.equipmentNumber = equipmentNumber;
        this.sensorType = sensorType
    }
}


export { DataPoint, Coord, BuildingData, SensorData, StreamType };
