import mongoose from 'mongoose'
import chalk from 'chalk'
import session from 'express-session'
import express from 'express'
const { MONGODB_URI } = process.env
const MongoStore = require('connect-mongo')(session)
const app = express.Router()

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

module.exports = app
