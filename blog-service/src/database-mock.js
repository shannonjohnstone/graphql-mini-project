import { usersMock, commentsMock, postsMock } from './mock-data'

export default () => ({
  users: [...usersMock],
  comments: [...commentsMock],
  posts: [...postsMock],
})
