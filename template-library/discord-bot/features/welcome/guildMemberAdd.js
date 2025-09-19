const { Events, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Path to the guild-specific settings file
const settingsPath = path.join(__dirname, '..\guild-settings.json');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    let settings = {};
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath));
    }

    const guildSettings = settings[member.guild.id];
    if (!guildSettings) return;

    // Handle welcome message
    if (guildSettings.welcome && guildSettings.welcome.channelId) {
      const channel = member.guild.channels.cache.get(guildSettings.welcome.channelId);
      if (channel) {
        const welcomeMessage = guildSettings.welcome.message
          .replace('{user}', member.user.toString())
          .replace('{server}', member.guild.name);
        channel.send(welcomeMessage);
      }
    }

    // Handle logging
    if (guildSettings.logs && guildSettings.logs.channelId) {
      const logChannel = member.guild.channels.cache.get(guildSettings.logs.channelId);
      if (logChannel) {
        const embed = new EmbedBuilder()
          .setColor(0x00FF00)
          .setTitle('Member Joined')
          .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
          .addFields({ name: 'User ID', value: member.user.id })
          .setTimestamp();
        logChannel.send({ embeds: [embed] });
      }
    }
  },
};