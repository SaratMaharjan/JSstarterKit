/* eslint-disable no-console */

const webpack = require('webpack');
const chalk = require('chalk');
const webpackConfig = require('../webpack.config');

console.log(chalk.blue('Generating minified bundle'));

webpack(webpackConfig).run((err, stats) => {
	if (err) {
		console.log(chalk.red(err));
		return 1;
	}

	const jsonStats = stats.toJson();

	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(chalk.red(error)));
	}

	if (jsonStats.hasWarnings) {
		console.log(chalk.yellow('Webpack generated following warnings:'));
		jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
	}

	console.log(chalk.green('production build succeeded'));
	return 0;
});
