'use strict';

var config = require('./index');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    return User.find(id).exec(function(err, user) {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: config.facebook.app_id,
    clientSecret: config.facebook.app_secret,
    callbackURL: config.facebook.callback_url
  }, function(token, refreshToken, profile, done) {
    var email = profile._json.email;

    User
      .findOne({ email: email })
      .exec(function(err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        }

        user = new User({
          email: profile._json.email,
          facebook: {
            id: profile.id,
            token: token,
            profile: profile._json
          }
        });

        return user.save(function(err, user) {
          if (err) {
            return done(err);
          }
          return done(null, user);
        });
      });

    return;
  }));

  passport.use(new GoogleStrategy({
    clientID: config.google.client_id,
    clientSecret: config.google.client_secret,
    callbackURL: config.google.redirect_uri
  }, function(token, refreshToken, profile, done) {
    var email = profile.emails[0].value;

    User
      .findOne({ email: email })
      .exec(function(err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        }

        user = new User({
          email: email,
          google: {
            id: profile.id,
            token: token,
            profile: profile._json
          }
        });

        return user.save(function(err, user) {
          if (err) {
            return done(err);
          }
          return done(null, user);
        });
      });

      return;
    })
  );

  return;

};
