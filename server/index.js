// Load environment variables
require('dotenv').load()

/**
 * @desc Determine if application is running in development. Used for configs
 * @type {Boolean}
 */
var isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * Module dependencies.
 * @type {exports}
 */
const bodyParser = require('body-parser')
const compress = require('compression')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressValidator = require('express-validator')
const http = require('http')
const io = require('socket.io')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const util = require('util')
const enrouten = require('express-enrouten')
const favicon = require('serve-favicon')
const serveStatic = require('serve-static')
const passport = require('passport')
const cors = require('cors')
const app = express()

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

app.use(cors())

/** @namespace process.env.MONGODB_URL */
/** @namespace process.env.SESSION_SECRET */
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URL || 'mongodb://localhost/backpack-dev',
    ttl: 14 * 24 * 60 * 60 // = 14 days. Default
  })
}))

// Add db to app object
GLOBAL.DB = require('./db')

// Set port
app.set('port', 3000)

/**
 * Allow for the use of HTTP verbs such as PUT or DELETE in places
 * where the client doesn't support it.
 */
app.use(methodOverride())

// Add `compression` for compressing responses.
app.use(compress())

// Add `morgan` for logging HTTP requests.
app.use(morgan('dev'))

// Add `body-parser` for parsing request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

/**
 * Add `express-validator`
 * This module allows values in req.body to be validated with the use of
 * helper methods.
 */
app.use(expressValidator())

// Add cookie-parser
app.use(cookieParser())

// Add `locals` to response object
app.use(function (req, res, next) {
  res.locals.bundle = isDevelopment ? 'main' : 'main.min'
  return next()
})

// Serve favicon
app.use(favicon(path.resolve(__dirname, '../client/favicon.ico')))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

require('./lib/passport')

// Set folder for static files.
app.use('/assets', serveStatic(path.join(__dirname, '/../client/dist'),
  { maxAge: '1d' } // TTL (Time To Live) for static files
))

// If we get here then the request for a static file is invalid so we may as well stop here
app.use('/assets', function (req, res, next) {
  return res.sendStatus(404)
})

// Add routes to application stack
app.use(enrouten({directory: 'controllers'}))

app.get('*', function response (req, res) {
  if (req.user) {
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
  } else {
    res.sendFile(path.join(__dirname, '/../client/login.html'))
  }
})

const port = app.get('port')
const env = app.get('env')
const server = http.Server(app)

// Add socket to app and begin listening.
app.socket = io(server)

// Start application server.
server.listen(port, function () {
  return util.log('Cthulhu has risen at port ' + port + ' in ' + env + ' mode')
})

// Emit initial message
app.socket.on('connection', function (socket) {
  return socket.emit('message', {message: 'Cthulhu has you in her grips.'})
})
