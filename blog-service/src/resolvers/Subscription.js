import { error } from '../resolvers/resolver-utils'
import { resolveSubscriptionKey, types } from '../lib/subscription-utils'

// Subscriptions
export default {
  post: {
    subscribe(parent, args, { pubsub }) {
      return pubsub.asyncIterator(resolveSubscriptionKey(types.POST))
    },
  },
  comment: {
    subscribe(parent, { postId }, { repository, pubsub }) {
      const post = repository.getPost(postId)

      if (!post) error('Post does not exist')

      return pubsub.asyncIterator(resolveSubscriptionKey(types.COMMENT, postId))
    },
  },
}
