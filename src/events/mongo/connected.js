const chalk = require('chalk');

module.exports = {
    name: 'connected',
    once: false,
    execute() {
        console.log(chalk.green("[Database Status]: Connected"));
    }
}