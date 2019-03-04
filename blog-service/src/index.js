import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import database from './database'
import repository from './repository'
import * as makeServices from './service'

const dataRepository = repository(database)

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers: resolvers,
  context: {
    queryService: makeServices.makeQueryService(dataRepository),
    mutationService: makeServices.makeMutationService(dataRepository),
    typesService: makeServices.makeTypesService(dataRepository),
  },
})

server.start({ port: 4000 }, () => console.log('Server is up')) // eslint-disable-line
