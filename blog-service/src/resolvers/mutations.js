import uuid from 'uuid/v4'
import {
  emailAlreadyExists,
  authorExists,
  postExistsAndPublished,
  error,
} from './resolver-utils'

export default repository => {
  let { users, comments, posts } = repository

  return {
    createUser(parent, args, ctx, info) {
      const { data } = args
      if (emailAlreadyExists(users, data))
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
      if (!authorExists(users, data)) error('User does not exists')

      const post = {
        id: uuid(),
        ...data,
      }

      posts = posts.concat(post)
      return post
    },
    createComment(parent, args, ctx, info) {
      const { data } = args
      if (!authorExists(users, data)) error('User does not exists')
      if (!postExistsAndPublished(posts, data))
        error('Post does not exists or has not been published yet.')

      const comment = {
        id: uuid(),
        ...data,
      }

      comments = comments.concat(comment)
      return comment
    },
  }
}
