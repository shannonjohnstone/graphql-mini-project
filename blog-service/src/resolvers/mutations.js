import uuid from 'uuid/v4'
import {
  emailAlreadyExists,
  authorExists,
  findUser,
  deleteUser,
  postExistsAndPublished,
  error,
} from './resolver-utils'

export default repository => {
  return {
    createUser(parent, args, ctx, info) {
      const { data } = args
      if (emailAlreadyExists(repository.users, data))
        error('User with this email already exists')

      const user = {
        id: uuid(),
        ...data,
      }

      users = users.concat(user)

      return user
    },
    createPost(parent, args, ctx, info) {
      const { data } = args
      if (!authorExists(repository.users, data)) error('User does not exists')

      const post = {
        id: uuid(),
        ...data,
      }

      repository.posts = repository.posts.concat(post)
      return post
    },
    createComment(parent, args, ctx, info) {
      const { data } = args
      if (!authorExists(repository.users, data)) error('User does not exists')
      if (!postExistsAndPublished(repository.posts, data))
        error('Post does not exists or has not been published yet.')

      const comment = {
        id: uuid(),
        ...data,
      }

      repository.comments = repository.comments.concat(comment)
      return comment
    },
    deleteUser(parent, args, ctx, info) {
      const user = findUser(repository.users, args)
      if (!user) error('User not found')

      const updatedUsers = deleteUser(repository.users, user)
      repository.users = updatedUsers

      return user
    },
  }
}
