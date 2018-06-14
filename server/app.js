require('@babel/register')
import mongoose from 'mongoose'
import chalk from 'chalk'
import session from 'express-session'
import express from 'express'
const { MONGODB_URI } = process.env
const MongoStore = require('connect-mongo')(session)
const app = express.Router()
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import HTML from '../client/components/HTML'
import App from '../client/components/App'

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

app.use(
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

app.get('*', (req, res, next) => {
	const scripts = new Set()
	scripts.add('/assets/app.js')
	const children = renderToString(<App />)
	const data = {
		title: 'Test',
		description: '123',
		scripts: [...scripts],
		styles: [],
		children,
		configs: {}
	}
	res.send(`<!doctype html>${renderToStaticMarkup(<HTML {...data} />)}`)
})

module.exports = app
