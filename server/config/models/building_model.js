/**
 * mongoose model to get building metadata
 * NOTE: currently not using this.
 */

//Require Mongoose
import mongoose from 'mongoose';

//Define a schema
const Schema = mongoose.Schema;

// define the relevant info
var BuildingSchema = new Schema(
    {
        _id             : String,
        bldgKey         : [ String ],
        nameTag         : String,
        buildingType    : String,
        center          : { long: Number, lat: Number },
        primaryPercent  : String,
        primaryUse      : String,
        secondaryPercent: String,
        secondaryUse    : String,
        active          : Boolean,
    },
    {
        collection: 'building'
    }
);

// Export function to create model class
module.exports = mongoose.model('building', BuildingSchema);
