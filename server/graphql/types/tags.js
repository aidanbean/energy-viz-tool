/* TODO - find out which commodities/EUIs are needed for the application 
                 ...or if they are even needed at all...              */

const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const CommodityTagsType = new GraphQLObjectType({
    name: 'CommodityTagsType',
    fields: {
        // commodity types here...
    }
})

const EuiTagsType = new GraphQLObjectType({
    name: 'EuiTagsType',
    fields: {
        // EUI types here....
    }
})

const TagsType = new GraphQLObjectType({
    name: 'TagsType',
    fields: {
        // tag fields here...
    }
})