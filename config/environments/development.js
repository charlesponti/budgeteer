/**
 * @desc Configuration for application
 * @type {Object}
 */
module.exports = {

  cthulhu: {
    port: 3000,

    public: 'static',

    views: 'views',

    session: {
      redisHost: 'localhost',
      redisPort: 6348,
      secret: 'meerkatmanorrox'
    },

    appName: 'My Super Awesome App Name',

    passRoutes: ['api', 'auth']
  },

  'appKey': 'cthulhurules',

  'session_ttl': 360000,

  'baseUrl': 'http://127.0.0.1:3000',

  'logFile': '../logs/requests.log',

  'google': {
    'realm': 'http://127.0.0.1:3000',
    'client_id': process.env.GOOGLE_ID || '1234',
    'client_secret': process.env.GOOGLE_SECRET || '1234',
    'redirect_uri': 'http://127.0.0.1:3000/auth/google/callback'
  },

  'db': 'mongodb://localhost/backpack-dev',

  'mailer': {
    'service': 'foobar',
    'from_email': 'foo@foo.com',
    'service_username': 'foo@foo.com',
    'service_password': 'fooPassword'
  }

};
