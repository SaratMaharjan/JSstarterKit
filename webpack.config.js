/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(`Using configuration for : ${process.env.NODE_ENV}`);

const extractSass = new ExtractTextPlugin({
	filename: '[name].[chunkhash].css',
	disable: process.env.NODE_ENV === 'development'
});

module.exports = {
	target: 'web',
	entry: {
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index')
	},
	output: {
		path: path.resolve(__dirname, 'src'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'sass-loader'
					}],
					// use style-loader in development
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[chunckhash].[ext]'
					}
				}]
			},
			{
				test: /\.vue$/,
				use: [{
					loader: 'vue-loader',
					options: {
						loaders: {}
						// other vue-loader options go here
					}
				}]
			}
		]
	},
	plugins: [
		extractSass,
		new WebpackMd5Hash(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			trackJSsToken: ' '
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: process.env.NODE_ENV
			}
		})
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	performance: {
		hints: false
	},
	devtool: 'inline-source-map'
};

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = 'source-map';
	module.exports.output.path = path.resolve(__dirname, 'dist');
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}
