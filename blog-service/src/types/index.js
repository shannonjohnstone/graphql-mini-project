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
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(data: CreatePostInput): Post!,
    createComment(data: CreateCommentInput): Comment!
    deleteUser(id: ID!): User!
    deletePost(id: ID!): Post!
    deleteComment(id: ID!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!,
    body: String!,
    published: Boolean!,
    author: Int
  }

  input CreateCommentInput {
    text: String!,
    author: ID!,
    post: ID!
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

export default typeDefs
