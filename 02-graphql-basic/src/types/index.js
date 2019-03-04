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
    createUser(name: String!, email: String!, age: Int): User!
    createPost(
      title: String!,
      body: String!,
      published: Boolean!,
      author: Int): Post!,
    createComment(
      text: String!,
      author: ID!,
      post: ID!
    ): Comment!
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
