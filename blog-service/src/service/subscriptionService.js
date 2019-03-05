import { subscriptionConfig } from '../lib/subscription-utils'

// subscription service logic
export default pubsub => ({
  updatePost(originalPost, post) {
    const { publish, actions, types } = subscriptionConfig(post, pubsub)

    let type
    if (originalPost.published && !post.published) {
      type = actions.DELETED
    } else if (!originalPost.published && post.published) {
      type = actions.CREATED
    } else {
      type = actions.UPDATED
    }

    publish(types.POST, type)
  },
  updateComment(comment, args) {
    const { publish, actions, types } = subscriptionConfig(comment, pubsub)
    publish(types.COMMENT, actions.UPDATED, args.id)
  },
  createPost(post, args) {
    if (args.data.published) {
      const { publish, actions, types } = subscriptionConfig(post, pubsub)
      publish(types.POST, actions.CREATED)
    }
  },
  createComment(comment, args) {
    const { publish, actions, types } = subscriptionConfig(comment, pubsub)
    publish(types.COMMENT, actions.CREATED, args.data.post)
  },
  deletePost(post) {
    if (post.published) {
      const { publish, actions, types } = subscriptionConfig(post, pubsub)
      publish(types.POST, actions.DELETED)
    }
  },
})
