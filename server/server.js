/* eslint-disable no-console */

import fs from 'fs';
import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import cors from 'cors';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config';

const serverConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/server.json'), 'utf-8'));
// eslint-disable-next-line space-infix-ops
const env = process.env.NODE_ENV ||'production';
const port = serverConfig.port;
const app = express();

console.log(env);
console.log(config.output.path);

app.use(cors());

if (env === 'production') {
	app.use(compression());
	app.use(express.static(config.output.path));
}

if (env === 'development') {
	const compiler = webpack(config);
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
}

app.get('/', (req, res) => {
	console.log(config.output.path);
	res.sendFile(path.join(config.output.path, '/index.html'));
});

app.get('/users', (req, res) => {
	res.json([
		{ id: 1, firstName: 'some1' },
		{ id: 2, firstName: 'some2' }
	]);
});

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server running on port: ${port}`);
		open(`http://localhost:${port}`);
	}
});
