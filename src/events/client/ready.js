const { ActivityType } = require("discord.js");
const chalk = require('chalk');

module.exports = {
  name: "ready",
  once: true,
  type: "client",
  async execute(client) {
    setInterval(client.pickPresence, 15 * 1000);
    console.log(chalk.green(`[Client Status] Ready with user: ${client.user.tag}`));
  },
};
