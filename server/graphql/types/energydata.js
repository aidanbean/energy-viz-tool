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

/* for a given commodity, return a list of Data extracted from JSON stream */
const EnergyDataType = new GraphQLObjectType({
    name: 'EnergyDataType',
    description: 'Meter-level demand and usage data for a CEED building',
    fields: {
        commodity: { type: GraphQLString },
        data: { type: newGraphQLList(DataPointsType) }
    }
});

module.exports = EnergyDataType;

