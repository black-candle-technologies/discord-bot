const fs = require("fs");
const chalk = require("chalk");

const { REST } = require(`@discordjs/rest`);
const { Routes } = require("discord-api-types/v9");
const { Collection } = require("discord.js");

let commands = new Collection();
let commandArray = [];

module.exports = (client) => {
  (client.registerCommands = (fsFolder, requireFolder) => {
    let commandFolders = fs
      .readdirSync(fsFolder)
      .filter((folder) => fs.lstatSync(`${fsFolder}/${folder}`).isDirectory());
    if (commandFolders)
      commandFolders.forEach((folder) => {
        if (folder.startsWith("#")) return;
        client.registerCommands(
          `${fsFolder}/${folder}`,
          `${requireFolder}/${folder}`
        );
      });

    let commandFiles = fs
      .readdirSync(fsFolder)
      .filter((file) => file.endsWith(".js"));
    if (!commandFiles) return;

    commandFiles.forEach((file) => {
      const command = require(`${requireFolder}/${file}`);
      commands.set(command.data.name, command);
      commandArray.push(command.data.toJSON());
      console.log(
        chalk.green(
          `[Client] Command: ${command.data.name} has been registered!`
        )
      );
    });
  }),
    (client.refreshCommands = async () => {
      const { clientId } = process.env;
      const rest = new REST({ version: "9" }).setToken(process.env.token);
      try {
        console.log(
          chalk.green("[Client] Started refreshing application (/) commands.")
        );

        await rest.put(Routes.applicationCommands(clientId), {
          body: commandArray,
        });

        console.log(
          chalk.green(
            `[Client] Successfully refreshed application (/) commands with ${commandArray.length} total.`
          )
        );
      } catch (error) {
        console.error(error);
      }
    });
};
