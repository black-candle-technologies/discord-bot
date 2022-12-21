const chalk = require('chalk');

module.exports = {
    name: 'disconnected',
    once: false,
    type: "mongo",
    execute() {
        console.log(chalk.red("[Database Status]: Disconnected"));
    }
}