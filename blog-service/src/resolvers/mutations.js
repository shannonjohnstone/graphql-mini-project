export default {
  createUser(parent, args, { mutationService }) {
    const user = mutationService.createUser(args.data)
    return user
  },
  updateUser(parent, args, { mutationService }) {
    const user = mutationService.updateUser(args.id, args.data)
    return user
  },
  updatePost(
    parent,
    args,
    { mutationService, subscriptionService, repository },
  ) {
    const originalPost = { ...repository.getPost(args.id) }

    const post = mutationService.updatePost(args.id, args.data)
    subscriptionService.updatePost(originalPost, post, args)

    return post
  },
  updateComment(parent, args, { mutationService, subscriptionService }) {
    const comment = mutationService.updateComment(args.id, args.data)

    subscriptionService.updateComment(comment)

    return comment
  },
  createPost(parent, args, { mutationService, subscriptionService }) {
    const post = mutationService.createPost(args.data)

    subscriptionService.createPost(post, args)

    return post
  },
  createComment(parent, args, { mutationService, subscriptionService }) {
    const comment = mutationService.createComment(args.data)

    /**
     * first argument for publish is the key, it must match the key created in
     * the subscription resolver for the asyncIterator
     * second argument is the comment itself
     */
    subscriptionService.createComment(comment, args)

    return comment
  },
  deleteUser(parent, args, { mutationService }, info) {
    const user = mutationService.deleteUser(args)
    return user
  },
  deletePost(parent, args, { mutationService, subscriptionService }, info) {
    const post = mutationService.deletePost(args)

    subscriptionService.deletePost(post)

    return post
  },
  deleteComment(parent, args, { mutationService }, info) {
    const post = mutationService.deleteComment(args)
    return post
  },
}
