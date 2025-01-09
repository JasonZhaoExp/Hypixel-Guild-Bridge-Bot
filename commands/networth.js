const axios = require('axios');

async function networth(bot, username, args) {
  const targetUser = args[0] || username;

  try {
    const response = await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${encodeURIComponent(targetUser)}`);
    const profiles = response.data.profiles;
    const latestProfile = profiles[Object.keys(profiles)[0]];
    const netWorth = latestProfile.networth.networth;

    const message = `${targetUser}'s net worth is ${formatNumber(netWorth)} coins.`;
    bot.chat(message);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      bot.chat('API rate limit exceeded. Please try again later.');
    } else {
      bot.chat(`Error fetching net worth for ${targetUser}.`);
    }
  }
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = { executeCommand };
