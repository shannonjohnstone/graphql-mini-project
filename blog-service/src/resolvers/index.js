import Mutation from './mutations'
import Query from './queries'
import Types from './types'
import Subscription from './Subscription'

// resolvers
export default {
  Query,
  Mutation,
  Subscription,
  ...Types,
}
