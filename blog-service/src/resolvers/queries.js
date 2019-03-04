export default {
  users(parent, args, { queryService }, info) {
    return queryService.resolveUsers(args)
  },
  comments(parent, args, { queryService }, info) {
    return queryService.resolveComments(args)
  },
  posts(parent, args, { queryService }, info) {
    return queryService.resolvePosts(args)
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
