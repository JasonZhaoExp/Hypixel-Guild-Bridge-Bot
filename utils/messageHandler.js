const { networth } = require('../commands/networth');

function handleMinecraftMessage(bot, username, message) {
  if (message.startsWith('!')) {
    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'nw') {
      networth(bot, username, args);
    }
  }
}

function handleDiscordMessage(minecraftBot, message) {
  const channelId = process.env.GUILD_CHAT_CHANNEL_ID;
  if (message.channel.id !== channelId) return;

  const sanitizedMessage = sanitizeMessage(message.content);
  const messages = splitMessage(sanitizedMessage);

  messages.forEach((msg) => {
    if (!msg.startsWith('/')) {
      minecraftBot.chat(msg);
    }
  });
}

function sanitizeMessage(message) {
    const naughtyWords = [
        "fuck", "shit", "sex", "cum", "piss", "dick", 
        "asshole", "bitch", "cunt", "whore", "retard", 
        "nigger", "faggot", "dyke", "kill yourself", 
        "rape", "suicide", "nazi", "hitler", "fat", 
        "ugly", "nigga", "pussy", "cock", "nipple", 
        "boob", "semen", "porn", "anal", "twat", 
        "balls", "chink", "spic", "wetback", "terrorist", 
        "isis", "pedophile", "molest", "incest", "groomer"
    ]
  let sanitized = message;
  naughtyWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    sanitized = sanitized.replace(regex, '****');
  });
  return sanitized;
}

function splitMessage(message) {
  const maxLength = 100; // Hypixel's chat limit
  const regex = new RegExp(`.{1,${maxLength}}`, 'g');
  return message.match(regex);
}

module.exports = { handleMinecraftMessage, handleDiscordMessage };
