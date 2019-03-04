import uuid from 'uuid/v4'
import { usersMock, commentsMock, postsMock } from '../mock-data'

let users = [...usersMock]
let comments = [...commentsMock]
let posts = [...postsMock]

// resolvers
export default {
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      console.log({ users })
      const userExists = users.some(user => user.email === args.email)

      if (userExists) throw new Error('User with this email already exists')

      const user = {
        id: uuid(),
        name: args.name,
        email: args.email,
        age: args.age,
      }

      users = users.concat(user)

      return user
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
