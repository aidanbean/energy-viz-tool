'use strict';

/*  GraphQL types for PI Web API queries to the database, with some starting types with sample fields. 
    Modify and change these as you see fit during your GraphQL API development. */

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLString = _require.GraphQLString,
    GraphQLList = _require.GraphQLList,
    GraphQLFloat = _require.GraphQLFloat,
    GraphQLBoolean = _require.GraphQLBoolean;

var DataPointsType = new GraphQLObjectType({
    name: 'DataPointsType',
    description: 'PI Data extracted from JSON stream',
    fields: {
        TimeStamp: { type: GraphQLString },
        Value: { type: GraphQLFloat },
        UnitsAbbreviation: { type: GraphQLString },
        Good: { type: GraphQLBoolean },
        Questionable: { type: GraphLBoolean },
        Substituted: { type: GraphQLBoolean },
        Month: { type: GraphQLString }
    }
});

var EnergyDataType = new GraphQLObjectType({
    name: 'EnergyDataType',
    description: 'Meter-level demand and usage data for a building',
    fields: {
        commodity: { type: GraphQLString },
        data: { type: newGraphQLList(DataPointsType) }
    }
});

module.exports = EnergyDataType;
//# sourceMappingURL=energydata.js.map