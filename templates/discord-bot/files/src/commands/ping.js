const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(false))
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Provides information about the user.')),
  permissions: ['ADMINISTRATOR'], // Requires ADMINISTRATOR permission
  cooldown: 5, // Cooldown of 5 seconds
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'user') {
      await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    } else {
      const input = interaction.options.getString('input');
      if (input) {
        await interaction.reply(`Pong! You said: ${input}`);
      } else {
        await interaction.reply('Pong!');
      }
    }
  },
};
