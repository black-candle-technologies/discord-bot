let fs = require('fs');
let chalk = require('chalk');

module.exports = (client) => {
  client.registerComponents = async (fsFolder, requireFolder) => {
    let componentFolders = fs
      .readdirSync(fsFolder)
      .filter((folder) => fs.lstatSync(`${fsFolder}/${folder}`).isDirectory());
    if (componentFolders)
    componentFolders.forEach((folder) => {
        if (folder.startsWith("#")) return;
        client.registerEvents(
          `${fsFolder}/${folder}`,
          `${requireFolder}/${folder}`
        );
      });

    let componentFiles = fs
      .readdirSync(fsFolder)
      .filter((file) => file.endsWith(".js"));
    if (!componentFiles) return;

    componentFiles.forEach(file => {
        let component = require(`${requireFolder}/${file}`);
        let { type, name } =  component;
        switch(type) {
            case "button":
                let buttons = client.buttons;
                buttons.set(name, component);
                console.log(chalk.green(`[Client] Button: ${name} has been registered!`));
                break;
            case "selectMenu":
                let selectMenus = client.selectMenus;
                selectMenus.set(name, component);
                console.log(chalk.green(`[Client] SelectMenu: ${name} has been registered!`));
                break;
            case "modals":
                let modals = client.modals;
                modals.set(name, component);
                console.log(chalk.green(`[Client] Modal: ${name} has been registered!`));
                break;
            default:
                break;
        }
    })
  };
};
