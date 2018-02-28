/*  GraphQL types for PI Web API queries to the database, with some starting types with sample fields.
    Modify and change these as you see fit during your GraphQL API development. */

import {
    graphql,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLBoolean
} from 'graphql';


const dataPointsType = new GraphQLObjectType({
    name: 'dataPointsType',
    description: 'PI Data extracted from JSON stream',
    fields: {
        Timestamp: { type: GraphQLString },
        Value: { type: GraphQLFloat },
        UnitsAbbreviation: { type: GraphQLString},
        Good: { type: GraphQLBoolean },
        Questionable: { type: GraphQLBoolean },
        Substituted: { type: GraphQLBoolean },
    },
});

const energyInputType = new GraphQLObjectType({
    name: "energyInputType",
    fields: {
        tagName: { type: GraphQLString },
        building: { type: GraphQLString },
        equipmentType: { type: GraphQLString },
        equipmentNumber: { type: GraphQLString },
        sensorType: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        interval: { type: GraphQLString },
    },
});

const energyDataType = new GraphQLObjectType({
    name: 'energyDataType',
    description: 'Meter-level demand and usage data for a building',
    fields: {
        // input: { type: energyInputType },
        data: { type: new GraphQLList(dataPointsType) },
    },
});

export {
    energyInputType,
    dataPointsType,
    energyDataType
};
