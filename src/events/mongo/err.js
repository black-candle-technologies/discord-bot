const chalk = require('chalk');

module.exports = {
    name: 'err',
    once: false,
    type: "mongo",
    execute(err) {
        console.log(chalk.red(`[Database Status]: An error has occured:\n${err}`));
    }
}