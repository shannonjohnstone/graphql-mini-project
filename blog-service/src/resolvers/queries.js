export default repository => {
  let { users, comments, posts } = repository

  return {
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
  }
}
