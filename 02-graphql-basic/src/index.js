import { GraphQLServer } from 'graphql-yoga'

// type definitions (schema)

/**
 * types
 * Scalar types (single value)
 * String, Boolean, Int, Float, ID
 *
 * Custom types
 * User, a type that will return a collection of data
 */

const typeDefs = `
  type Query {
    greeting(name: String): String!
    add(a: Float!, b: Float!): Float!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    kids: [String!]
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// resolvers
const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      return args.a + args.b
    },
    greeting(parent, args, ctx, info) {
      return args.name ? `Hello ${args.name}` : 'Hello'
    },
    me() {
      return {
        id: 123456789,
        name: 'Dustin',
        kids: ['one', 'two'],
        email: 'dustin@example.com',
      }
    },
    post() {
      return {
        id: 987654321,
        title: 'A Dogs Life',
        body: 'This is the body example',
        published: true,
      }
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start({ port: 4000 }, () => console.log('Server is up')) // eslint-disable-line
