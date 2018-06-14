import mongoose from 'mongoose'
import chalk from 'chalk'
import session from 'express-session'
import express from 'express'
const { MONGODB_URI } = process.env
const MongoStore = require('connect-mongo')(session)
const server = express.Router()
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import HTML from './components/HTML'
import App from './components/App'
import { matchPath, StaticRouter } from 'react-router-dom'
import routes from './routes'
import { ServerStyleSheet } from 'styled-components'

mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI)
mongoose.connection.on('error', err => {
	console.error(err)
	console.log(
		'%s MongoDB connection error. Please make sure MongoDB is running.',
		chalk.red('✗')
	)
	process.exit()
})

server.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: 'Secret',
		cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
		store: new MongoStore({
			url: MONGODB_URI,
			autoReconnect: true
		})
	})
)

server.get('*', async (req, res, next) => {
	console.log(1231231)
	const activeRoute = routes.find(route => matchPath(req.url, route)) || {}
	const sheet = new ServerStyleSheet()
	const promise = activeRoute.fetchInitialData
		? activeRoute.fetchInitialData(req.path)
		: Promise.resolve()
	promise.then(result => {
		const repos = result || []
		const context = { data: repos }
		const scripts = new Set()
		scripts.add('/assets/app.js')
		const children = renderToString(
			sheet.collectStyles(
				<StaticRouter location={req.url} context={context}>
					<App data={repos} />
				</StaticRouter>
			)
		)
		const styleTags = sheet.getStyleElement()
		const data = {
			title: 'Test',
			description: '123',
			scripts: [...scripts],
			styles: [],
			children,
			configs: repos,
			styleTags
		}
		res.send(`<!doctype html>${renderToStaticMarkup(<HTML {...data} />)}`)
	})
})

module.exports = server
