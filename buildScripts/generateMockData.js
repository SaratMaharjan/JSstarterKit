/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import fs from 'fs';
import chalk from 'chalk';
import schema from './mockDataSchema';

const json = JSON.stringify(jsf(schema));

fs.writeFile('./src/api/db.json', json, (err) => {
	if (err) {
		console.log(chalk.red(err));
	} else {
		console.log(chalk.green('Mock data generated.'));
	}
});
