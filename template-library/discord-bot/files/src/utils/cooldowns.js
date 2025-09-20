/** @format */

const cooldowns = new Map()

module.exports = {
  setCooldown: (userId, commandName, cooldownTime) => {
    const now = Date.now()
    const expirationTime = now + cooldownTime

    if (!cooldowns.has(commandName)) {
      cooldowns.set(commandName, new Map())
    }

    const timestamps = cooldowns.get(commandName)
    timestamps.set(userId, expirationTime)
  },

  getCooldown: (userId, commandName) => {
    if (!cooldowns.has(commandName)) {
      return 0
    }

    const timestamps = cooldowns.get(commandName)
    return timestamps.get(userId) || 0
  },
}
