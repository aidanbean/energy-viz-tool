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

class Coord {
    constructor(long, lat) {
        this.long = long;
        this.lat = lat;
    }
}

class BuildingData {
     constructor(bldgKey, nameTag, buildingType, long, lat, primaryPercent, primaryUse, secondaryPercent, secondaryUse, active) {
         // this._id = id;
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

export { DataPoint, Coord, BuildingData };