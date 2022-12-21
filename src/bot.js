// Set .env variables
require("dotenv").config();

// Discord Token & Mongo URI
const { token, databaseToken } = process.env;

const {
  Client,
  Collection,
  GatewayIntentBits,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Setup the Discord Client
const intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages];
const client = new Client({ intents });

client.color = "#72bcd4";
client.cancelButton = new ButtonBuilder()
  .setCustomId("cancel")
  .setLabel("❌ Cancel")
  .setStyle(ButtonStyle.Danger);

client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commands = new Collection();
client.commandArray = [];

const fs = require("fs");
const chalk = require("chalk");

let registerFunctionsInDir = (fsPath, requirePath) => {
  let functions = fs.readdirSync(fsPath);
  functions.forEach((func) => {
    if (fs.lstatSync(`${fsPath}/${func}`).isDirectory())
      return registerFunctionsInDir(`${fsPath}/${func}`, `${requirePath}/${func}`);
    if(!func.endsWith('.js')) return;
    let file = require(`${requirePath}/${func}`);
    file(client);
  });
};

registerFunctionsInDir('./src/functions', './functions');

client.registerEvents('./src/events', '../../events');

let modules = fs.readdirSync('./src/modules').filter(module => fs.lstatSync(`./src/modules/${module}`).isDirectory());

console.log(chalk.green(`[Client] Registering ${modules.length} modules...`));
modules.forEach(module => client.registerModule(`${module}`));
console.log(chalk.green(`[Client] Registered ${modules.length} modules!`));

// Login to Mongo Database then Discord Client
(async () => {
  await mongoose.connect(databaseToken).catch(console.error);

  await client.refreshCommands();
  client.login(token);
})();
