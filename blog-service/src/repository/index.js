export default function(database) {
  const updatePosts = posts => {
    database.posts = posts
  }

  const updateComments = comments => {
    database.comments = comments
  }

  const updateUsers = users => {
    database.users = users
  }

  return {
    getUsers() {
      return database.users
    },
    getUser(id) {
      return this.getUsers().find(user => user.id === id)
    },
    getComments() {
      return database.comments
    },
    getComment(id) {
      return database.comments.find(comment => comment.id === id)
    },
    getPosts() {
      return database.posts
    },
    getPost(id) {
      return this.getPosts().find(post => post.id === id)
    },
    addPost(post) {
      return database.posts.concat(post)
    },
    addUser(user) {
      return database.users.concat(user)
    },
    updatePost(_post) {
      const posts = this.getPosts()
      const postIndex = posts.findIndex(post => post.id === _post.id)

      updatePosts([
        ...posts.splice(0, postIndex),
        _post,
        ...posts.slice(postIndex + 1),
      ])

      return _post
    },
    updateUser(_user) {
      const users = this.getUsers()
      const userIndex = users.findIndex(user => user.id === _user.id)

      updateUsers([
        ...users.splice(0, userIndex),
        _user,
        ...users.slice(userIndex + 1),
      ])

      return _user
    },
    addComment(comment) {
      return database.comments.concat(comment)
    },
    deleteUser(userId) {
      const updatedUsers = this.getUsers().filter(user => user.id !== userId)
      return updatedUsers
    },
    deletePostAndRelatedContent(post, args) {
      // delete post from given post id
      updatePosts(this.getPosts().filter(post => post.id !== args.id))

      // delete comments that relate to the post id
      updateComments(
        this.getComments().filter(comment => comment.post !== args.id),
      )

      // return deleted post
      return post
    },
    deleteUserAndRelatedContent(user, args) {
      const updatedUsers = this.deleteUser(user.id)

      // delete data related to user NOTE: this is temp solution

      // delete comments from posts that match the deleted users id
      updatePosts(
        this.getPosts().filter(post => {
          const match = post.author === args.id

          if (match) {
            updateComments(
              this.getComments().filter(comment => comment.post !== post.id),
            )
          }
          return !match
        }),
      )

      // delete comments that related to user
      updateComments(
        this.getComments().filter(comment => comment.author !== args.id),
      )

      updateUsers(updatedUsers)

      return user
    },
    deleteCommentAndRelatedContent(comment, args) {
      updateComments(
        this.getComments().filter(comment => comment.id !== args.id),
      )
      return comment
    },
  }
}
