import mutation from './mutations'
import query from './queries'
import types from './types'

// resolvers
export default function(repository, makeServices) {
  return {
    Query: query(repository, makeServices.makeQueryService),
    Mutation: mutation(repository, makeServices.makeMutationService),
    ...types(repository, makeServices.makeTypesService),
  }
}
