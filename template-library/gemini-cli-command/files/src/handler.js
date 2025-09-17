/**
 * @format
 *
 * Handler for the 'greet' slash command.
 *
 * @param {object} interaction - The interaction object from Gemini CLI.
 * @property {object} options - The options provided by the user.
 */
async function handleGreet(interaction) {
  const user = interaction.options.getUser('user');
  const message = interaction.options.getString('message');

  let response = `Hello, ${user.username}!`;
  if (message) {
    response += ` ${message}`;
  }

  await interaction.reply(response);
}

module.exports = {
  execute: handleGreet,
};
