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
    updateUser(id, data) {
      const user = repository.getUser(id)
      const users = repository.getUsers()

      if (!user) error('User does not exist')

      if (user.email.toLowerCase() === data.email.toLowerCase())
        error('This is your current email.')

      if (emailAlreadyExists(users, data))
        error('User with this email already exists')

      const updatedUser = repository.updateUser({ ...user, ...data })

      return updatedUser
    },
    updatePost(id, data) {
      const post = repository.getPost(id)

      if (!post) error('Post does not exist')

      const updatedPost = repository.updatePost({ ...post, ...data })

      return updatedPost
    },
    updateComment(id, data) {
      const comment = repository.getComment(id)

      if (!comment) error('Comment does not exist')

      const updatedComment = repository.updateComment({ ...comment, ...data })

      return updatedComment
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
    deletePost(args) {
      const post = repository.getPost(args.id)

      if (!post) error('Post does not exist')

      const deletedPost = repository.deletePostAndRelatedContent(post, args)
      return deletedPost
    },
    deleteComment(args) {
      const comment = repository.getComment(args.id)

      if (!comment) error('Comment does not exist')

      const deletedComment = repository.deleteCommentAndRelatedContent(
        comment,
        args,
      )

      return deletedComment
    },
  }
}
