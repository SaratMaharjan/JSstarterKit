/* eslint-disable no-console */

const fs = require('fs');
const express = require('express');
const path = require('path');
const open = require('open');
const compression = require('compression');
const cors = require('cors');
const logger = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config');

const serverConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/server.json'), 'utf-8'));
// eslint-disable-next-line space-infix-ops
const env = process.env.NODE_ENV ||'development';
const port = serverConfig.port;
const app = express();

app.use(cors());
app.use(logger('dev'));

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
