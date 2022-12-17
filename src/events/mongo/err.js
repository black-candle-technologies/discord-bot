const chalk = require('chalk');

module.exports = {
    name: 'err',
    once: false,
    execute(err) {
        console.log(chalk.red(`[Database Status]: An error has occured:\n${err}`));
    }
}