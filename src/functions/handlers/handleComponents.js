const fs = require("fs");

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentFolders = fs.readdirSync("./src/components");
    componentFolders.forEach((folder) => {
      const componentFiles = fs
        .readdirSync(`./src/components/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { buttons, selectMenus, modals } = client;

      switch (folder) {
        case "buttons":
          componentFiles.forEach((file) => {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
          });
          break;
        case "selectMenus":
            componentFiles.forEach((file) => {
                const menu = require(`../../components/${folder}/${file}`);
                selectMenus.set(menu.data.name, menu);
            })
            break;
        case "modals":
            componentFiles.forEach((file) => {
                const modal = require(`../../components/${folder}/${file}`);
                modals.set(modal.data.name, modal);
            });
        default:
            break;
      }
    });
  };
};
