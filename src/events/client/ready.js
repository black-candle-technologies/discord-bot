const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    setInterval(client.pickPresence, 10 * 1000);
    console.log(`Ready with user: ${client.user.tag}`);
  },
};
