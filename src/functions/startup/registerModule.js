const chalk = require("chalk");
const fs = require("fs");

module.exports = (client) => {
  client.registerModule = (folder) => {
    let moduleInfo = require(`../../modules/${folder}/module.json`);
    if (!moduleInfo)
      console.error(
        chalk.red(`[Client] Module Error: Folder ${folder} has no module.json!`)
      );

    let { name, description, entry } = moduleInfo;
    let entryPoint = require(`../../modules/${folder}/${entry}`);

    let hasEvents = fs.existsSync(`./src/modules/${folder}/events`);
    if (hasEvents) client.registerEvents(`./src/modules/${folder}/events`, `../../modules/${folder}/events`);

    let hasCommands = fs.existsSync(`./src/modules/${folder}/commands`);
    if (hasCommands) client.registerCommands(`./src/modules/${folder}/commands`, `../../modules/${folder}/commands`);

    let hasComponents = fs.existsSync(`./src/modules/${folder}/components`);
    if(hasComponents) client.registerComponents(`./src/modules/${folder}/components`, `../../modules/${folder}/components`);

    console.log(chalk.green(`[Client] Module: ${name} has been registered!`));
    entryPoint();
  };
};
