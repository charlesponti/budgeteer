/**
 * Module dependencies.
 * @type {exports}
 */
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressValidator from 'express-validator';
import http from 'http';
import io from 'socket.io';
import methodOverride from 'method-override';
import morgan from 'morgan';
import util from 'util';
import enrouten from 'express-enrouten';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import connetMongo from 'connect-mongo';

const MongoStore = connetMongo(session);
const {
  DATABASE_URI,
  SERVER_PORT,
  SESSION_SECRET,
  } = process.env;

const app = express();
app.use(cors());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: DATABASE_URI,
    ttl: 14 * 24 * 60 * 60, // = 14 days. Default
  }),
}));

// Add db to app object
GLOBAL.DB = require('./lib/db');

// Set port
app.set('port', SERVER_PORT);

/**
 * Allow for the use of HTTP verbs such as PUT or DELETE in places
 * where the client doesn't support it.
 */
app.use(methodOverride());

// Add `compression` for compressing responses.
app.use(compress());

// Add `morgan` for logging HTTP requests.
app.use(morgan('dev'));

// Add `body-parser` for parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Add `express-validator`
 * This module allows values in req.body to be validated with the use of
 * helper methods.
 */
app.use(expressValidator());

// Add cookie-parser
app.use(cookieParser());

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
    { path: '/', method: 'GET', handler: require('./controllers/index') },
  ],
}));

app.use((req, res) => (
  res.status(404).json({
    message: 'The index you have requested has no corresponding route',
  })
));

const port = app.get('port');
const env = app.get('env');
const server = http.Server(app); /* eslint new-cap: 0 */

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
