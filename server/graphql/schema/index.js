const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// GraphQL type requires here

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Root Query Fields here...
    }
});