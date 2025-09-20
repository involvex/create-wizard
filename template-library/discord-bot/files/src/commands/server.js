/** @format */

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute(interaction) {
    const { guild } = interaction
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Server Info: ${guild.name}`)
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: 'Server Name', value: guild.name, inline: true },
        { name: 'Total Members', value: String(guild.memberCount), inline: true },
        { name: 'Created On', value: guild.createdAt.toDateString(), inline: false },
        { name: 'Server ID', value: guild.id, inline: false },
      )
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  },
}
