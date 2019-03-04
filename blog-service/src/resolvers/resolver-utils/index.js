export const emailAlreadyExists = (users, args) =>
  users.some(user => user.email === args.email)

export const authorExists = (users, args) =>
  users.some(user => user.id === args.author)

export const postExistsAndPublished = (posts, args) =>
  posts.some(post => post.id === args.post && post.published)

export const findUser = (users, args) => users.find(user => user.id === args.id)

export const deleteUser = (users, userInfo) =>
  users.filter(user => user.id !== userInfo.id)

export const error = errText => {
  throw new Error(errText)
}
