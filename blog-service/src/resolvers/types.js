export default (repository, makeService) => {
  const typesService = makeService(repository)

  return {
    User: {
      comments(parent) {
        return typesService.resolveCommentsByUser(parent.id)
      },
      posts(parent) {
        return typesService.resolvePostsByUser(parent.id)
      },
    },
    Comment: {
      post(parent) {
        return typesService.resolvePostsForComment(parent.post)
      },
      author(parent) {
        return typesService.resolveAuthorForComment(parent.author)
      },
    },
    Post: {
      comments(parent) {
        return typesService.resolveCommentsForPost(parent.id)
      },
      author(parent) {
        return typesService.resolveAuthorForPost(parent.author)
      },
    },
  }
}
