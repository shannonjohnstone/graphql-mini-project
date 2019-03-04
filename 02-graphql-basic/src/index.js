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

// Demo user data
const users = [
  {
    id: 1,
    name: 'Dustin',
    email: 'dustin@example.com',
  },
  {
    id: 2,
    name: 'Zag',
    email: 'dustin@example.com',
    age: 1,
  },
]

const posts = [
  {
    id: 1,
    title: 'A dogs life',
    body: 'this is the dummy body text',
    published: true,
  },
  {
    id: 2,
    title: 'The sun',
    body: 'this is the dummy body text',
    published: true,
  },
  {
    id: 3,
    title: 'Why we dislike cats',
    body: 'this is the dummy body text',
    published: true,
  },
]

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    users(parent, args, ctx, info) {
      const userQuery = args.query ? args.query.toLowerCase() : null
      return !userQuery
        ? users
        : users.filter(user => user.name.toLowerCase().includes(userQuery))
    },
    posts(parent, args, ctx, info) {
      const postsQuery = args.query ? args.query.toLowerCase() : null
      return !postsQuery
        ? posts
        : posts.filter(post => post.title.toLowerCase().includes(postsQuery))
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
