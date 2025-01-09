require('dotenv').config();
const { createBot } = require('./bot');
const { initializeDiscord } = require('./discord');

const minecraftBot = createBot();
initializeDiscord(minecraftBot);
