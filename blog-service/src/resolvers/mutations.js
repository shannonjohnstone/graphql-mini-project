export default (repository, makeService) => {
  const mutationService = makeService(repository)

  return {
    createUser(parent, args) {
      const user = mutationService.createUser(args.data)
      return user
    },
    createPost(parent, args) {
      const post = mutationService.createPost(args.data)
      return post
    },
    createComment(parent, args) {
      const comment = mutationService.createComment(args.data)
      return comment
    },
    deleteUser(parent, args, ctx, info) {
      const user = mutationService.deleteUser(args)
      return user
    },
    deletePost(parent, args, ctx, info) {
      const post = mutationService.deletePost(args)
      return post
    },
    deleteComment(parent, args, ctx, info) {
      const post = mutationService.deleteComment(args)
      return post
    },
  }
}
