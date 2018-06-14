require('@babel/register')

import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk'
import path from 'path'

dotenv.load({
	path: '.env'
})
const { NODE_ENV, PUBLIC_PATH, PORT } = process.env
global.__DEV__ = NODE_ENV !== 'production'
const app = express()

app.set('env', NODE_ENV)
app.set('port', PORT)
app.set('trust proxy', true)

if (NODE_ENV === 'development') {
	const webpack = require('webpack')
	const config = require('./configs/webpack.config')
	const webpackMiddleware = require('webpack-dev-middleware')
	const webpackHotMiddleware = require('webpack-hot-middleware')
	const compiler = webpack(config)
	const middleware = webpackMiddleware(compiler, {
		hot: true,
		inline: true,
		publicPath: PUBLIC_PATH + '/',
		serverSideRender: true,
		stats: {
			colors: true
		}
	})
	app.use(middleware)
	app.use(webpackHotMiddleware(compiler))
} else {
	const staticPath = path.resolve(__dirname, './build' + PUBLIC_PATH)
	console.log(PUBLIC_PATH, staticPath)
	app.use(
		PUBLIC_PATH,
		express.static(staticPath, {
			maxAge: 31557600000
		})
	)
}

const server = __DEV__ ? require('./server/app') : require('./build/app')
app.use(server)

app.listen(app.get('port'), () => {
	console.log(
		'%s App is running at http://localhost:%d in %s mode',
		chalk.green('✓'),
		app.get('port'),
		app.get('env')
	)
	console.log('  Press CTRL-C to stop\n')
})
