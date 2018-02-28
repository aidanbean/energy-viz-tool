/* mongoose model to insert in database */

//Require Mongoose
import mongoose from 'mongoose';

//Define a schema
const Schema = mongoose.Schema;

// this associates a webId with a tag (point).
var DataSchema = new Schema(
    {
        webId          : String,
        tagName        : String,
        building       : String,
        equipmentType  : String,
        equipmentNumber: String,
        sensorType     : String
    },
    {
        collection: 'ahuData'
    }
);

// Export function to create "DataModel" model class
module.exports = mongoose.model('DataModel', DataSchema);
