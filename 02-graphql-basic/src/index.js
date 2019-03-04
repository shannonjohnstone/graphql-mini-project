import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './types'
import resolvers from './resolvers'

const server = new GraphQLServer({ typeDefs, resolvers })

server.start({ port: 4000 }, () => console.log('Server is up')) // eslint-disable-line
