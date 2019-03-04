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
    comments: [1, 4],
  },
  {
    id: 2,
    name: 'Zag',
    email: 'dustin@example.com',
    age: 1,
    comments: [2, 3],
  },
]

const comments = [
  {
    id: 1,
    text: 'First comment',
    author: 1,
    post: 3,
  },
  {
    id: 2,
    text: 'Second comment',
    author: 2,
    post: 3,
  },
  {
    id: 3,
    text: 'Third comment',
    author: 2,
    post: 2,
  },
  {
    id: 4,
    text: 'Forth comment',
    author: 1,
    post: 1,
  },
]

const posts = [
  {
    id: 1,
    title: 'A dogs life',
    body: 'this is the dummy body text',
    published: true,
    author: 1,
    comments: [4],
  },
  {
    id: 2,
    title: 'The sun',
    body: 'this is the dummy body text',
    published: true,
    author: 1,
    comments: [3],
  },
  {
    id: 3,
    title: 'Why we dislike cats',
    body: 'this is the dummy body text',
    published: true,
    author: 2,
    comments: [1, 2],
  },
]

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    kids: [String!]
    age: Int
    posts: [Post!]!
    comments: [Comment!]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    comments(parent, args, ctx, info) {
      const commentsQuery = args.query ? args.query.toLowerCase() : null
      return !commentsQuery
        ? comments
        : comments.filter(comment =>
            comment.text.toLowerCase().includes(commentsQuery),
          )
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

  // resolve relational data
  User: {
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id)
    },
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.id === parent.id)
    },
  },
  Comment: {
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post)
    },
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
  },
  Post: {
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id)
    },
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start({ port: 4000 }, () => console.log('Server is up')) // eslint-disable-line
