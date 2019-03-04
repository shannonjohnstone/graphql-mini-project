export default {
  createUser(parent, args, { mutationService }) {
    const user = mutationService.createUser(args.data)
    return user
  },
  createPost(parent, args, { mutationService }) {
    const post = mutationService.createPost(args.data)
    return post
  },
  createComment(parent, args, { mutationService }) {
    const comment = mutationService.createComment(args.data)
    return comment
  },
  deleteUser(parent, args, { mutationService }, info) {
    const user = mutationService.deleteUser(args)
    return user
  },
  deletePost(parent, args, { mutationService }, info) {
    const post = mutationService.deletePost(args)
    return post
  },
  deleteComment(parent, args, { mutationService }, info) {
    const post = mutationService.deleteComment(args)
    return post
  },
}
