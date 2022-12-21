const fs = require("fs");
const chalk = require("chalk");

const { connection } = require("mongoose");

module.exports = (client) => {
  client.registerEvents = (fsFolder, requireFolder) => {
    let eventFolders = fs
      .readdirSync(fsFolder)
      .filter((folder) => fs.lstatSync(`${fsFolder}/${folder}`).isDirectory());
    if (eventFolders)
      eventFolders.forEach((folder) => {
        if (folder.startsWith("#")) return;
        client.registerEvents(
          `${fsFolder}/${folder}`,
          `${requireFolder}/${folder}`
        );
      });

    let eventFiles = fs
      .readdirSync(fsFolder)
      .filter((file) => file.endsWith(".js"));
    if (!eventFiles) return;

    eventFiles.forEach((file) => {
      let { type, name, once, execute } = require(`${requireFolder}/${file}`);
      switch (type) {
        case "client":
          if (once) client.once(name, (...args) => execute(...args, client));
          else client.on(name, (...args) => execute(...args, client));
          console.log(
            chalk.green(`[Client] Event: ${name} has been registered!`)
          );
          break;
        case "mongo":
          if (once)
            connection.once(name, (...args) => execute(...args, client));
          else connection.once(name, (...args) => execute(...args, client));
          console.log(
            chalk.green(`[Database] Event: ${name} has been registered!`)
          );
          break;
      }
    });
  };
};
