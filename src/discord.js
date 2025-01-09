const { Client, GatewayIntentBits } = require('discord.js');
const { handleDiscordMessage } = require('../utils/messageHandler');

function initializeDiscord(minecraftBot) {
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  });

  client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    handleDiscordMessage(minecraftBot, message);
  });

  client.login(process.env.DISCORD_TOKEN);
}

module.exports = { initializeDiscord };
