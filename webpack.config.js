const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.load({
	path: '.env'
})

const { NODE_ENV, PUBLIC_PATH } = process.env
const isDev = NODE_ENV !== 'production'

const outputPath = isDev
	? path.resolve(__dirname, '.' + PUBLIC_PATH)
	: path.resolve(__dirname, '../build' + PUBLIC_PATH)
const plugins = [
	...[
		new webpack.DefinePlugin({
			'process.env': {
				ENV: JSON.stringify(NODE_ENV),
				NODE_ENV: JSON.stringify(NODE_ENV),
				BABEL_ENV: JSON.stringify(NODE_ENV),
				PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
				__isBrowser__: JSON.stringify('true')
			}

		})
	],
	...(isDev ? [new webpack.HotModuleReplacementPlugin()] : [])
]

const extraEntryFiles = isDev
	? ['react-hot-loader/patch', 'webpack-hot-middleware/client']
	: []

const defaultConfigs = {
	devtool: !isDev ? false : 'cheap-eval-source-map',
	target: 'web',
	mode: NODE_ENV
}
module.exports = [
	{
		...defaultConfigs,
		entry: {
			main: [
				...extraEntryFiles,
				path.resolve(__dirname, './src/client.js')
			]
		},
		output: {
			filename: 'app.js',
			path: outputPath,
			chunkFilename: 'chunks/[name].js'
		},
		plugins,
		module: {
			rules: [
				{
					oneOf: [
						{
							test: /\.jsx?$/,
							use: 'babel-loader',
							exclude: /node_modules/
						},
						{
							test: /\.css$/,
							exclude: /node_modules/,
							use: [
								'style-loader',
								{
									loader: 'css-loader',
									query: {
										sourceMap: isDev,
										modules: true,
										importLoaders: 1,
										localIdentName:
											'[name]-[local]_[hash:base64:5]'
									}
								},
								{
									loader: 'postcss-loader'
								}
							]
						},
						{
							loader: 'file-loader',
							exclude: [/\.js$/, /\.json$/],
							options: {
								name: 'static/[name].[hash:8].[ext]'
							}
						}
					]
				}
			]
		}
	}
]
