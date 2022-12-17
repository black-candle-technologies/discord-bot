require("dotenv").config();

const { token, databaseToken } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { connect } = require('mongoose')
const fs = require("fs");

const intents = [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ]
const client = new Client({ intents });
client.color = "#72bcd4";
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
functionFolders.forEach((folder) => {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  functionFiles.forEach((file) =>
    require(`./functions/${folder}/${file}`)(client)
  );
});

client.handleEvents();
client.handleCommands();
client.handleComponents();
(async () => {
  await connect(databaseToken).catch(console.error);
  client.login(token);
})();