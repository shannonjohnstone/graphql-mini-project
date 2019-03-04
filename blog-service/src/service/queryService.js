export default repository => {
  return {
    resolveUsers(args) {
      const userQuery = args.query ? args.query.toLowerCase() : null
      const users = repository.getUsers()

      return !userQuery
        ? users
        : users.filter(user => user.name.toLowerCase().includes(userQuery))
    },
    resolveComments(args) {
      const commentsQuery = args.query ? args.query.toLowerCase() : null
      const comments = repository.getComments()

      return !commentsQuery
        ? comments
        : comments.filter(comment =>
            comment.text.toLowerCase().includes(commentsQuery),
          )
    },
    resolvePosts(args) {
      const postsQuery = args.query ? args.query.toLowerCase() : null
      const posts = repository.getPosts()

      return !postsQuery
        ? posts
        : posts.filter(post => post.title.toLowerCase().includes(postsQuery))
    },
  }
}
