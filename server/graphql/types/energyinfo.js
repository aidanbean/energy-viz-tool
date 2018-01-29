const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const TagsType = require('./tags');

const EnergyInfoType = new GraphQLObjectType({
    name: "EnergyInfoType",
    fields: {
        // Energy Info fields here
    }
})