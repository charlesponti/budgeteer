'use strict';

/**
 * @desc Configuration for applicatio
 * @type {Object}
 */
module.exports = {

  "port": 3000,

  "appName": "Backpack",

  "appKey": "cthulhurules",

  "session_ttl": 360000,

  "sessionSecret": "cthulhurules",

  "sessionStore": "cthulhu-session",

  "baseUrl": "http://127.0.0.1:3000",

  "google": {
    "realm": "http://127.0.0.1:3000",
    "client_id": process.env.GOOGLE_ID,
    "client_secret": process.env.GOOGLE_SECRET,
    "redirect_uri": "http://127.0.0.1:3000/auth/google/callback"
  },

  "db": "mongodb://localhost/backpack-dev",

  "mailer": {
    "service": "foobar",
    "from_email": "foo@foo.com",
    "username": "foo@foo.com",
    "password": "fooPassword"
  }

};

