const chalk = require('chalk');

module.exports = {
    name: 'connecting',
    once: false,
    execute() {
        console.log(chalk.yellow("[Database Status]: Connecting"));
    }
}