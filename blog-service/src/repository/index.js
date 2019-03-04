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
      console.log('getUsers', database)
      return database.users
    },
    getUser(id) {
      return this.getUser().find(user => user.id === id)
    },
    getComments() {
      return database.comments
    },
    getPosts() {
      return database.posts
    },
    addPost(post) {
      return database.posts.concat(post)
    },
    addUser(user) {
      return database.users.concat(user)
    },
    addComment(comment) {
      return database.comments.concat(comment)
    },
    deleteUser(userId) {
      const updatedUsers = this.getUsers().filter(user => user.id !== userId)
      return updatedUsers
    },
    deleteUserAndRelatedContent(user, args) {
      const updatedUsers = this.deleteUser(user.id)

      // delete data related to user NOTE: this is temp solution
      // posts

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

      // comments
      updateComments(
        this.getComments().filter(comment => comment.author !== args.id),
      )

      updateUsers(updatedUsers)

      return user
    },
  }
}
