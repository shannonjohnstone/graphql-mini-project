import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './types'
import resolvers from './resolvers'
import databaseMock from './database-mock'
import repository from './repository'
import * as makeServices from './service'

const server = new GraphQLServer({
  typeDefs,
  resolvers: resolvers(repository(databaseMock()), makeServices),
})

server.start({ port: 4000 }, () => console.log('Server is up')) // eslint-disable-line
