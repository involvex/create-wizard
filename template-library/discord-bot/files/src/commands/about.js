const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Displays information about this bot.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('About Me')
      .setDescription('I am a friendly Discord bot created using the `@involvex/create-wizard` template.')
      .addFields(
        { name: 'Version', value: '1.0.0', inline: true },
        { name: 'Author', value: 'Your Name', inline: true },
        { name: 'GitHub', value: 'https://github.com/involvex/create-wizard' }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};