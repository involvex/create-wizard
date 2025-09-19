const { SlashCommandBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Path to the guild-specific settings file
const settingsPath = path.join(__dirname, '..\..\guild-settings.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-logs')
    .setDescription('Sets up the channel for bot logging.')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to send logs to.')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)),
  permissions: ['Administrator'], // Only administrators can run this
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');

    let settings = {};
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath));
    }

    settings[interaction.guild.id] = {
      ...settings[interaction.guild.id],
      logs: {
        channelId: channel.id,
      },
    };

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    await interaction.reply({
      content: `Bot logs will now be sent to #${channel.name}.`,
      ephemeral: true,
    });
  },
};