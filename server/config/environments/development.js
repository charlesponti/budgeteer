
module.exports = {

  "port": 3000,

  "appName": "Backpack",

  "appKey": "cthulhurules",

  "session_ttl": 360000,

  "sessionSecret": "cthulhurules",

  "sessionStore": "cthulhu-session",

  "public": "../public",

  "views": "./views",

  "baseUrl": "http://localhost:4000",

  "facebook": {
    "app_id": "foobar",
    "app_secret": "foobar",
    "callback_url": "foobar"
  },

  "twitter": {
    "token": "foobar",
    "token_secret": "foobar",
    "consumer_key": "foobar",
    "consumer_secret": "foobar",
    "callback_url": "foobar"
  },

  "google": {
    "realm": "http://127.0.0.1:3000",
    "client_id": process.env.GOOGLE_ID,
    "client_secret": process.env.GOOGLE_SECRET,
    "redirect_uri": "http://127.0.0.1:3000/auth/google/callback"
  },

  "foursquare": {
    "client_id": "foobar",
    "client_secret": "foobar",
    "callback_url": "foobar"
  },

  "github": {
    "client_id": "foobar",
    "client_secret": "foobar",
    "token": "foobar",
    "callback_url": "foobar"
  },

  "authy": {
    "url": "foobar",
    "sandbox_url": "foobar",
    "api_key": "foobar",
    "sandbox_api_key": "foobar"
  },

  "amazon": {
      "access_key": "foobar",
      "secret_access_key": "foobar",
      "s3_bucket": "foobar"
  },

  "twilio": {
    "sid": "foobar",
    "token": "foobar"
  },

  "db": "mongodb://localhost/backpack-dev",

  "mailer": {
    "service": "foobar",
    "from_email": "foo@foo.com",
    "service_username": "foo@foo.com",
    "service_password": "fooPassword"
  }

}
