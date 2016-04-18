

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
const passport = require('passport')
const cors = require('cors')
const app = express()
import ParseServer from 'parse-server';

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

app.use(cors())
const {
  APP_ID,
  DATABASE_URI,
  MASTER_KEY,
  SERVER_HOST,
  SERVER_PORT,
  SESSION_SECRET,
  } = process.env;

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new Mongo(session)({
    url: DATABASE_URI,
    ttl: 14 * 24 * 60 * 60 // = 14 days. Default
  })
}))

// Add db to app object
GLOBAL.DB = require('./db')

// Set port
app.set('port', SERVER_PORT);

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



// Passport set up
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

require('./lib/passport');

// Add routes to application stack
app.use(enrouten({
  directory: 'controllers',
  routes: [
    { path: '/', method: 'GET', handler: require('./controllers/index') }
  ]
}));

app.use(
  '/parse',
  new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: path.resolve(__dirname, 'cloud.js'),
    appId: APP_ID,
    masterKey: MASTER_KEY,
    fileKey: 'f33fc1a9-9ba9-4589-95ca-9976c0d52cd5',
    serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
  })
);
const port = app.get('port');
const env = app.get('env');
const server = http.Server(app);

// Add socket to app and begin listening.
app.socket = io(server);

// Start application server.
server.listen(port, () => (
  util.log(`Cthulhu has risen at port ${port} in ${env} mode`)
));

// Emit initial message
app.socket.on('connection', (socket) => (
  socket.emit('message', { message: 'Cthulhu has you in her grips.' })
));
