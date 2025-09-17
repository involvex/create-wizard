/**
 * @format
 */

const { Client, GatewayIntentBits, Collection } = require('discord.js')
const { token } = require('./config.json')
const fs = require('fs')
const path = require('path')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  client.commands.set(command.data.name, command)
}

client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  // 1. Permission Handling
  if (command.permissions && !interaction.member.permissions.has(command.permissions)) {
    return interaction.reply({
      content: 'You do not have the required permissions to use this command.',
      ephemeral: true,
    });
  }

  // 2. Cooldown Handling
  if (command.cooldown) {
    const { setCooldown, getCooldown } = require('./utils/cooldowns');
    const now = Date.now();
    const cooldownAmount = command.cooldown * 1000; // Convert to milliseconds
    const expirationTime = getCooldown(interaction.user.id, command.data.name);

    if (expirationTime > now) {
      const timeLeft = (expirationTime - now) / 1000;
      return interaction.reply({
        content: `Please wait ${timeLeft.toFixed(
          1,
        )} more second(s) before reusing the 
${command.data.name}
 command.`, // Corrected: escaped backticks and newlines within template literal
        ephemeral: true,
      });
    }
    setCooldown(interaction.user.id, command.data.name, cooldownAmount);
  }

  // 3. Command Execution and Error Handling
  try {
    await command.execute(interaction);
  } catch (error) {
    const { handleError } = require('./utils/errorHandler');
    handleError(interaction, error);
  }
});

client.login(token)
