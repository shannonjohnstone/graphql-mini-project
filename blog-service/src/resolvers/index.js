import Mutation from './mutations'
import Query from './queries'
import Types from './types'

// resolvers
export default {
  Query,
  Mutation,
  ...Types,
}

// export default function(repository, makeServices) {
//   return {
//     Query: query(repository, makeServices.makeQueryService),
//     Mutation: mutation(repository, makeServices.makeMutationService),
//     ...types(repository, makeServices.makeTypesService),
//   }
// }
