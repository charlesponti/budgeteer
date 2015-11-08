/**
 * @desc Configuration for application
 * @type {Object}
 */
module.exports = {
  port: process.env.port || 5000,
  appName: "Backpack",
  appKey: process.env.appKey,
  session_ttl: 360000,
  sessionSecret: process.env.sessionSecret,
  sessionStore: process.env.sessionStore,
  baseUrl: "http://127.0.0.1:3000",
  google: {
    realm: "http://127.0.0.1:3000",
    client_id: process.env.GOOGLE_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: "http://127.0.0.1:3000/auth/google/callback"
  },
  db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
  mailer: {
    service: "foobar",
    from_email: "foo@foo.com",
    service_username: "foo@foo.com",
    service_password: "fooPassword"
  }
};
