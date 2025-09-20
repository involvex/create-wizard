/** @format */

const { Events, ActivityType } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`)
    // Set a default activity
    client.user.setActivity('you', { type: ActivityType.Watching })
  },
}
