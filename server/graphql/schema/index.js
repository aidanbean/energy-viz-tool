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
        roll(numRolls: Int!): [Int]
    }

    type InputType {
        tagName: String,
        building: String,
        equipmentType: String,
        equipmentNumber: String,
        sensorType: String,
        startTime: String,
        endTime: String,
        startDate: String,
        endDate: String,
        interval: String,
    }

    type Query {
        getData
        (
            building: String,
            equipmentType: String,
            equipmentNumber: String,
            sensorType: String,
            startDate: String,
            endDate: String,
            interval: String
        ): [DataPoint]
    }
`);

// This class implements the RandomDie GraphQL type
class InputType {
    constructor(building, equipmentType, equipmentNumber, sensorType, startDate, endDate, interval) {
        this.building = building;
        this.equipmentType = equipmentType;
        this.equipmentNumber = equipmentNumber;
        this.sensorType = sensorType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.interval = interval;
    }

    async fetchDB() {
        const dbEntry = {
            "building": this.building,
            "equipmentType": this.equipmentType,
            "equipmentNumber": this.equipmentNumber,
            "sensorType": this.sensorType
        };
        const dbResult = await DataModel.findOne(dbEntry);
        return dbResult;
    }
}

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

function helper (array, element) {
    const point = new DataPoint(element.Timestamp, element.Value, element.UnitsAbbreviation, element.Good, element.Questionable, element.Substituted);
    array.push(point);
}

// The root provides the top-level API endpoints
var root = {
    getData: async function ({building, equipmentType, equipmentNumber, sensorType, startDate, endDate, interval}) {
        const input = new InputType({building, equipmentType, equipmentNumber, sensorType, startDate, endDate, interval});
        const dbResult = input.fetchDB();
        console.log(dbResult.webId);
        const piResult = await fetchAPI.fetchStream_byMonths(dbResult.webId,
                                                             input.startDate,
                                                             input.endDate,
                                                             input.interval );
        console.log(piResult.Items);
        var listOfPoints = [];
        piResult.forEach(helper(listOfPoints, element));
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
