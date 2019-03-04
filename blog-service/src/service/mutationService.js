import uuid from 'uuid/v4'
import {
  emailAlreadyExists,
  authorExists,
  postExistsAndPublished,
  error,
} from '../resolvers/resolver-utils'

export default repository => {
  return {
    createUser(data) {
      const users = repository.getUsers()

      if (emailAlreadyExists(users, data))
        error('User with this email already exists')

      const user = {
        id: uuid(),
        ...data,
      }

      repository.addUser(user)

      return user
    },
    createComment(data) {
      const users = repository.getUsers()
      const posts = repository.getPosts()

      if (!authorExists(users, data)) error('User does not exists')
      if (!postExistsAndPublished(posts, data))
        error('Post does not exists or has not been published yet.')

      const comment = {
        id: uuid(),
        ...data,
      }

      repository.addComments(comment)
      return comment
    },
    createPost(data) {
      const users = repository.getUsers()

      if (!authorExists(users, data)) error('User does not exists')

      const post = {
        id: uuid(),
        ...data,
      }

      repository.addPost(post)
      return post
    },
    deleteUser(args) {
      const user = repository.getUser(args.id)

      if (!user) error('User not found')

      // delete user and related content, posts and comments
      const deletedUser = repository.deleteUserAndRelatedContent(user, args)

      return deletedUser
    },
  }
}
