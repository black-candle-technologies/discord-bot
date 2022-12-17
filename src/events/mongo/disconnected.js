const chalk = require('chalk');

module.exports = {
    name: 'disconnected',
    once: false,
    execute() {
        console.log(chalk.red("[Database Status]: Disconnected"));
    }
}