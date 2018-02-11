"use strict";

/* Entry point for GraphQL */

var _require = require('graphql'),
    GraphQLSchema = _require.GraphQLSchema,
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLString = _require.GraphQLString,
    GraphQLList = _require.GraphQLList,
    GraphQLNonNull = _require.GraphQLNonNull;

// GraphQL type "requires" here

var RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Root Query Fields here...
    }
});
//# sourceMappingURL=index.js.map