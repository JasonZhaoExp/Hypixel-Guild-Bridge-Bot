const mineflayer = require('mineflayer');
const { handleMinecraftMessage } = require('../utils/messageHandler');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mc.hypixel.net',
    username: process.env.MINECRAFT_EMAIL,
    password: process.env.MINECRAFT_PASSWORD
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    handleMinecraftMessage(bot, username, message);
  });

  bot.on('error', (err) => console.error('Minecraft Bot Error:', err));
  bot.on('end', () => {
    console.log('Minecraft bot disconnected. Reconnecting...');
    setTimeout(createBot, 5000);
  });

  return bot;
}

module.exports = { createBot };
