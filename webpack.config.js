/* eslint-disable no-console, prefer-template */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log(`Using configuration for : ${process.env.NODE_ENV}`);

const vueProject = true;
const ngProject = false;

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
		filename: (process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader'
					},
						'postcss-loader',
					{
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
				NODE_ENV: '"' + process.env.NODE_ENV + '"'
			}
		}),
		new CopyWebpackPlugin([{
			from: path.join(path.resolve(__dirname, 'src'), 'assets'),
			to: 'assets'
		}])
	],
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

if (vueProject) {
	module.exports.module.rules = (module.exports.module.rules || []).concat({
		test: /\.vue$/,
		use: [{
			loader: 'vue-loader',
			options: {
				loaders: {},
				postcss: [],
				extractCSS: true
				// other vue-loader options go here
			}
		}]
	});
	module.exports.resolve = {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	};
}

if (ngProject) {
	console.log('Need to add Angular Loader');
}
