export default {
  User: {
    comments(parent, args, { typesService }) {
      return typesService.resolveCommentsByUser(parent.id)
    },
    posts(parent, args, { typesService }) {
      return typesService.resolvePostsByUser(parent.id)
    },
  },
  Comment: {
    post(parent, args, { typesService }) {
      return typesService.resolvePostsForComment(parent.post)
    },
    author(parent, args, { typesService }) {
      return typesService.resolveAuthorForComment(parent.author)
    },
  },
  Post: {
    comments(parent, args, { typesService }) {
      return typesService.resolveCommentsForPost(parent.id)
    },
    author(parent, args, { typesService }) {
      return typesService.resolveAuthorForPost(parent.author)
    },
  },
}
