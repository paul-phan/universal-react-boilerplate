import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk'
import path from 'path'

dotenv.load({
	path: '.env'
})
const { NODE_ENV, PUBLIC_PATH, PORT } = process.env

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
		stats: 'errors-only'
	})
	app.use(middleware)
	app.use(webpackHotMiddleware(compiler))
} else {
	const staticPath = path.resolve(__dirname, './public' + PUBLIC_PATH)
	console.log(PUBLIC_PATH, staticPath)
	app.use(
		PUBLIC_PATH,
		express.static(staticPath, {
			maxAge: 31557600000
		})
	)
}

const server = require('./server/app')
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
