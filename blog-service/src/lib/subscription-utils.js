import { error } from '../resolvers/resolver-utils'

// TODO: move first two lib methods into lib folder out of the service file
// TODO: CLEAN UP ERROR HANDLING
export const types = { COMMENT: 'comment', POST: 'post' }

/**
 * keysConfig
 * separating this config so the implementation of
 * resolveSubscriptionKey or subscriptionConfig do not have
 * to be changes to add a new key config
 */
const keysConfig = {
  [types.COMMENT]: id => {
    if (!id || typeof id !== 'string')
      error('resolveSubscriptionKey: Invalid or missing id')

    return `subscription_comment:post_id:${id}`
  },
  [types.POST]: 'post',
}

// resolveSubscriptionKey value
export const resolveSubscriptionKey = (key, id, keys = keysConfig) => {
  if (!key || typeof key !== 'string')
    error('resolveSubscriptionKey: Invalid or missing key')

  const _key = keys[key]
  if (!_key) error('resolveSubscriptionKey: Invalid or missing key type')

  return typeof _key === 'function' ? _key(id) : _key
}

/**
 * subscriptionConfig lib
 * this is a util lib for a self contained subscriptions
 * @param {Object} dataItem
 * @param {Object} pubsub
 */
export const subscriptionConfig = (dataItem, pubsub) => {
  if (!dataItem || typeof dataItem !== 'object')
    error(`subscriptionConfig: Invalid or missing dataItem`)

  if (!pubsub.publish || typeof pubsub.publish !== 'function')
    error(`subscriptionConfig: Invalid or missing cb method`)

  const actions = { CREATED: 'CREATED', DELETED: 'DELETED', UPDATED: 'UPDATED' }

  const data = (key, action) => ({
    [key]: { mutation: actions[action], data: dataItem },
  })

  return {
    actions,
    types,
    publish(type, action, id) {
      if (!type || typeof type !== 'string')
        error(`subscriptionConfig: Invalid or missing type`)

      if (action !== actions[action])
        error(`subscriptionConfig: Invalid action`)

      const key = resolveSubscriptionKey(type, id)

      pubsub.publish(key, data(type, action))
    },
  }
}
