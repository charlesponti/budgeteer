const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('mongoose').model('User');

/** @namespace process.env.FACEBOOK_APP_ID */
/** @namespace process.env.FACEBOOK_APP_SECRET */
/** @namespace process.env.FACEBOOK_CALLBACK_URL */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  function(access_token, refresh_token, profile, done) {
    // asynchronous
    process.nextTick(function() {

      // find the user in the database based on their facebook id
      User.findOne({ 'id' : profile.id }, function(err, user) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);

        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        }
        else {
          // if there is no user found with that facebook id, create them
          var newUser = new User();

          // set the users facebook id
          newUser.id = profile.id;
          // we will save the token that facebook provides to the user
          newUser.accessToken = access_token;
          // look at the passport user profile to see how names are returned
          newUser.firstName  = profile.name.givenName;
          newUser.lastName = profile.name.familyName;
          // facebook can return multiple emails so we'll take the first
          newUser.email = profile.emails[0].value;

          // save our user to the database
          newUser.save(function(err) {
            if (err)
              throw err;

            // if successful, return the new user
            return done(null, newUser);
          });
        }
      });
    });
  }
));
