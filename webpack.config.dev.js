import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	devtool: 'inline-source-map',
	entry: [
		path.resolve(__dirname, 'src/index')
	],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'src'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ['css-loader', 'sass-loader']
			}
		]
	}
};
