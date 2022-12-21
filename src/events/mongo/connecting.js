const chalk = require('chalk');

module.exports = {
    name: 'connecting',
    once: false,
    type: "mongo",
    execute() {
        console.log(chalk.yellow("[Database Status]: Connecting"));
    }
}