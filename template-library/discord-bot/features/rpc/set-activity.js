/** @format */

const { SlashCommandBuilder, ActivityType } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-activity')
    .setDescription("Sets the bot's activity status.")
    .addStringOption(option =>
      option.setName('activity').setDescription('The activity to display').setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('The type of activity')
        .setRequired(true)
        .addChoices(
          { name: 'Playing', value: 'Playing' },
          { name: 'Watching', value: 'Watching' },
          { name: 'Listening to', value: 'Listening' },
          { name: 'Competing in', value: 'Competing' },
        ),
    ),
  permissions: ['Administrator'],
  async execute(interaction) {
    const activity = interaction.options.getString('activity')
    const typeName = interaction.options.getString('type')
    const type = ActivityType[typeName]

    try {
      await interaction.client.user.setActivity(activity, { type })
      await interaction.reply({
        content: `Activity set to "${typeName} ${activity}"`,
        ephemeral: true,
      })
    } catch (error) {
      console.error(error)
      await interaction.reply({ content: 'Failed to set activity.', ephemeral: true })
    }
  },
}
