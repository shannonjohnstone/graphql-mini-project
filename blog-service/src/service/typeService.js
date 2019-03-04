export default repository => {
  return {
    resolveCommentsByUser(id) {
      return repository.getComments().filter(comment => comment.author === id)
    },
    resolvePostsByUser(id) {
      return repository.getPosts().filter(post => post.id === id)
    },
    resolvePostsForComment(id) {
      return repository.getPosts().find(post => post.id === id)
    },
    resolveAuthorForComment(author) {
      return repository.getUsers().find(user => user.id === author)
    },
    resolveCommentsForPost(id) {
      return repository.getComments().filter(comment => comment.author === id)
    },
    resolveAuthorForPost(author) {
      return repository.getUsers().find(user => user.id === author)
    },
  }
}
