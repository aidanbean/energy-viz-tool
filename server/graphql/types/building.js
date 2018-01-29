/* Building Data pulled from FacilitiesLink API
 https://arm-tomcat1.ucdavis.edu/locations/buildings/thermalfeedback-1?apiKey=12345 */

 const { 
     GraphQLObjectType,
     GraphQLString,
     GraphQLList,
     GraphQLBoolean,
     GraphQLFLoat,
     GraphQLID
 } = require('graphql');
 

const BuildingType = new GraphQLObjectType({
    name: "BuildingType",
    fields: {
        // Buildings here
    }
}); 