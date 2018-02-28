
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import { dataPointsType, energyDataType } from '../types/energydata';

import mongoose from 'mongoose';
import DataModel from '../../config/model';
import fetchAPI from '../../pi/piFetchers';

const db = mongoose.connection;

// GraphQL type "requires" here
async function getData(args) {
    const dbEntry = {
        "building": args.building,
        "equipmentType": args.equipmentType,
        "equipmentNumber": args.equipmentNumber,
        "sensorType": args.sensorType
    };
    const dbResult = await DataModel.findOne(dbEntry);
    console.log(dbResult.webId);
    const piResult = await fetchAPI.fetchStream_byMonths(dbResult.webId,
                                                         args.startDate,
                                                         args.endDate,
                                                         args.interval );
    console.log(piResult.Items);
    return piResult.Items;
}

const energyQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'query monthly data',
    fields: () => ({
        request: {
            type: energyDataType,
            // `args` describes the arguments that the `stream` query accepts
            args: {
                building: { type: GraphQLString },
                equipmentType: { type: GraphQLString },
                equipmentNumber: { type: GraphQLString },
                sensorType: { type: GraphQLString },
                // startTime: { type: GraphQLString },
                // endTime: { type: GraphQLString },
                startDate: { type: GraphQLString },
                endDate: { type: GraphQLString },
                interval: { type: GraphQLString }
            },
            resolve: function () {
                return [
                    {
                        Timestamp: 'blah',
                        Value: 0.999,
                        UnitsAbbreviation: 'blah',
                        Good: true,
                        Questionable: true,
                        Substituted: true,
                    },
                    {
                        Timestamp: 'blah',
                        Value: 0.999,
                        UnitsAbbreviation: 'blah',
                        Good: true,
                        Questionable: true,
                        Substituted: true,
                    }
                ];
            }
        },
    }),
});

export { energyQuery };
