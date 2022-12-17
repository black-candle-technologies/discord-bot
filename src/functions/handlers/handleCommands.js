const { REST } = require(`@discordjs/rest`);
const { Routes } = require('discord-api-types/v9');

const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    commandFolders.forEach((folder) => {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      commandFiles.forEach((file) => {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Command: ${command.data.name} has been registered!`);
      });

    });

    const clientId = '1053430849095344138';
    const rest = new REST({ version: '9'}).setToken(process.env.token);
    try {
        console.log('Started refreshing application (/) commands.');
        
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: client.commandArray }
        )
        
        console.log('Successfully refreshed application (/) commands.');
    } catch (error) {
        console.error(error);
    }
  };
};
