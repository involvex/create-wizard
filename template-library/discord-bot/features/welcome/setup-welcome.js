/** @format */

const { SlashCommandBuilder, ChannelType } = require('discord.js')
const fs = require('fs')
const path = require('path')

// Path to the guild-specific settings file
const settingsPath = path.join(__dirname, '..\\..\\guild-settings.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-welcome')
    .setDescription('Sets up the welcome message for new members.')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to send welcome messages to.')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription(
          'The welcome message. Use {user} for username and {server} for server name.',
        )
        .setRequired(true),
    ),
  permissions: ['Administrator'], // Only administrators can run this
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel')
    const message = interaction.options.getString('message')

    let settings = {}
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath))
    }

    settings[interaction.guild.id] = {
      ...settings[interaction.guild.id],
      welcome: {
        channelId: channel.id,
        message: message,
      },
    }

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2))

    await interaction.reply({
      content: `Welcome messages will now be sent to #${channel.name}.`,
      ephemeral: true,
    })
  },
}
