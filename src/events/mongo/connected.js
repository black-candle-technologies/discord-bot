const chalk = require('chalk');

module.exports = {
    name: 'connected',
    once: false,
    type: "mongo",
    execute() {
        console.log(chalk.green("[Database Status]: Connected"));
    }
}