import uuid from 'uuid/v4'

export default repository => {
  const { users, comments, posts } = repository

  return {
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
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author)
      if (!userExists) throw new Error('User does not exists')

      const post = {
        id: uuid(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      }

      posts = posts.concat(post)
      return post
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author)
      const postExistsAndPublished = posts.some(
        post => post.id === args.post && post.published,
      )

      if (!userExists) throw new Error('User does not exists')
      if (!postExistsAndPublished)
        throw new Error('Post does not exists or has not been published yet.')

      const comment = {
        id: uuid(),
        text: args.text,
        author: args.author,
      }

      comments = comments.concat(comment)
      return comment
    },
  }
}
