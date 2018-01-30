/*  GraphQL types for PI Web API queries to the database, with some starting types with sample fields. 
    Modify and change these as you see fit during your GraphQL API development. */

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLBoolean
} = require('graphql');


const DataPointsType = new GraphQLObjectType({
    name: 'DataPointsType',
    description: 'PI Data extracted from JSON stream',
    fields: {
        TimeStamp: { type: GraphQLString },
        Value: { type: GraphQLFloat },
        UnitsAbbreviation: { type: GraphQLString},
        Good: { type: GraphQLBoolean },
        Questionable: { type: GraphLBoolean },
        Substituted: { type: GraphQLBoolean },
        Month: { type: GraphQLString }
    }
});

const EnergyDataType = new GraphQLObjectType({
    name: 'EnergyDataType',
    description: 'Meter-level demand and usage data for a building',
    fields: {
        commodity: { type: GraphQLString },
        data: { type: newGraphQLList(DataPointsType) }
    }
});

module.exports = EnergyDataType;
