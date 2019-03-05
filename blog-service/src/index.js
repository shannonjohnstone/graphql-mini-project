import { GraphQLServer, PubSub } from 'graphql-yoga'
import resolvers from './resolvers'
import database from './database'
import repository from './repository'
import * as makeServices from './service'

const dataRepository = repository(database)
const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers: resolvers,
  context: {
    pubsub,
    queryService: makeServices.makeQueryService(dataRepository),
    mutationService: makeServices.makeMutationService(dataRepository),
    typesService: makeServices.makeTypesService(dataRepository),
    subscriptionService: makeServices.makeSubscriptionService(pubsub),
    repository: dataRepository,
  },
})

server.start({ port: 4000 }, () => console.log('Server is up')) // eslint-disable-line
