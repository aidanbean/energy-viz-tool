/* Entry point for GraphQL */

/* NOTE: Trying a different implementation .  Ignore "query.js" and ./types
 * folder for this implementation
 */
import DataModel from '../../config/model';
import fetchAPI from '../../pi/piFetchers';

import {
    graphql,
    buildSchema
} from 'graphql';

var schema = buildSchema(`
    type DataPoint {
        Timestamp: String,
        Value: Float,
        UnitsAbbreviation: String,
        Good: Boolean,
        Questionable: Boolean,
        Substituted: Boolean,
    }

    type Query {
        dataByMonths
        (
            building: String,
            equipmentType: String,
            equipmentNumber: String,
            sensorType: String,
            startTime: String,
            endTime: String,
            interval: String
        ): [DataPoint],
        dataByMinutes
        (
            building: String,
            equipmentType: String,
            equipmentNumber: String,
            sensorType: String,
            startTime: String,
            endTime: String,
            interval: String
        ): [DataPoint],
    }
`);

// This class implements the DataPoint GraphQL type
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
            const point = new DataPoint(element.Timestamp, element.Value, element.UnitsAbbreviation, element.Good, element.Questionable, element.Substituted);
            listOfPoints.push(point);
        });
        return listOfPoints;
    }
}

export { schema, root };

// export default new GraphQLSchema({
//     query: energyQuery
//     // mutation: new GraphQLObjectType({
//     //     name: 'Mutation',
//     //     fields: () => ({
//     //         ...energyMutation,
//     //     }),
//     // }),
// });
