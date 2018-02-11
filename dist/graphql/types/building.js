"use strict";

/* Building Data to be pulled from FacilitiesLink API
 https://arm-tomcat1.ucdavis.edu/locations/buildings/thermalfeedback-1?apiKey=12345 */

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLString = _require.GraphQLString,
    GraphQLList = _require.GraphQLList,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLFLoat = _require.GraphQLFLoat,
    GraphQLID = _require.GraphQLID;

var BuildingType = new GraphQLObjectType({
    name: "BuildingType",
    fields: {
        // Buildings here
    }
});
//# sourceMappingURL=building.js.map