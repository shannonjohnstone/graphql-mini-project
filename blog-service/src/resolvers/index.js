import uuid from 'uuid/v4'
import { usersMock, commentsMock, postsMock } from '../mock-data'
import mutation from './mutations'
import query from './queries'

const repository = {
  users: [...usersMock],
  comments: [...commentsMock],
  posts: [...postsMock],
}

// resolvers
export default {
  Query: query(repository),
  Mutation: mutation(repository),
  User: {
    comments(parent, args, ctx, info) {
      return repository.comments.filter(comment => comment.author === parent.id)
    },
    posts(parent, args, ctx, info) {
      return repository.posts.filter(post => post.id === parent.id)
    },
  },
  Comment: {
    post(parent, args, ctx, info) {
      return repository.posts.find(post => post.id === parent.post)
    },
    author(parent, args, ctx, info) {
      return repository.users.find(user => user.id === parent.author)
    },
  },
  Post: {
    comments(parent, args, ctx, info) {
      return repository.comments.filter(comment => comment.author === parent.id)
    },
    author(parent, args, ctx, info) {
      return repository.users.find(user => user.id === parent.author)
    },
  },
}
