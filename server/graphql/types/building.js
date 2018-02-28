/* Building Data to be pulled from FacilitiesLink API
 https://arm-tomcat1.ucdavis.edu/locations/buildings/thermalfeedback-1?apiKey=12345 */

import {
    graphql
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
    GraphQLFLoat,
    GraphQLID
} from 'graphql';


const buildingType = new GraphQLObjectType({
    name: "BuildingType",
    fields: {
        // Buildings here
    }
});
