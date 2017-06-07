// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import open from 'open';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.dev';
// import cors from 'cors';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

// app.use(cors());

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../src/index.html'));
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
		open(`http://localhost:${port}`);
	}
});
