'use strict';

/**
 * Module dependencies
 * @type {exports}
 * @private
 */
var _ = require('lodash');
var express = require('express');
var Emitter = require('events').EventEmitter;

/**
 * Application dependencies
 * @type {exports}
 * @private
 */
var User = require('../models/user');

/**
 * Factory function that constructs the user controller
 * @private
 */
function UserController() {

  /**
   * Construct new controller
   * @type {Object}
   * @private
   */
  var controller = _.extend({}, Emitter.prototype);

  /**
   * Sign up user through two-factor authentication
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   */
  controller.logIn = function(req, res, next) {
    User.findOne({ email: req.body.email }).exec(function(err, user) {

      if (err) {
        req.flash('error', 'There was an unexpected server error.');
        return res.redirect('/login');
      }

      if (user) {
        return user.sendReset(function(err) {
          controller.emit('send-reset', err, user, req, res);
        });
      }

      user = new User({ email: req.body.email });
      user.save(function(err, user) {
        if (err) {
          console.log(err);
          req.flash('error', 'There was an unexpected server error.');
          return res.redirect('/login');
        }
        req.flash('success', 'You will recieve an email shortly to confirm your account');
        res.redirect('/login');
      });
    });
  };

  /**
   * Serve templates
   * @type {Object}
   */
  controller.serve = {
    /**
     * Serve sign up page
     * @param {IncomingMessage} req
     * @param {ServerResponse} res
     * @param {Function} next
     */
    login: function serveLogin(req, res) {
      if (req.isAuthenticated()) {
        return res.redirect('/account');
      }
      return res.render('users/login');
    }
  };

  /**
   * Log out user
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   */
  controller.logOut = function(req, res, next) {
    req.logout();
    res.redirect("/");
  };

  /**
   * Link Facebook account
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   */
  controller.linkFacebook = function(req, res, next) {
    if (!req.user) {
      return User
        .findOne({ email: req._oauth.profile.email })
        .exec(function(err, user) {
          controller.emit('link-oauth', err, user, 'facebook', req, res);
        });
    }
    return controller.emit('link-oauth', null, req.user, 'facebook', req, res);
  };

  /**
   * Link Google account
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   */
  controller.linkGoogle = function(req, res, next) {
    if (!req.user) {
      return User
        .findOne({ email: req._oauth.profile.emails[0].value })
        .exec(function(err, user) {
          controller.emit('link-oauth', err, user, 'google', req, res);
        });
    }
    return controller.emit('link-oauth', null, req.user, 'google', req, res);
  };

  /**
   Link Twitter account
   @param {string} token Twitter access token
   @param {string} secret Twitter token secret
   @param {object} profile Twitter profile
   @param {IncomingMessage} req
   @param {ServerResponse} res
   */
  controller.linkTwitter = function(req, res, next) {
    if (!req.user) {
      return User
        .findOne({ email: req._oauth.profile.email })
        .exec(function(err, user) {
          controller.emit('link-oauth', err, user, 'twitter', req, res);
        });
    }
    return controller.emit('link-oauth', null, req.user, 'twitter', req, res);
  };

  /**
   * Link Foursquare account
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   */
  controller.linkFoursquare = function(req, res, next) {
    if (!req.user) {
      User
        .findOne({ email: req._oauth.profile.email })
        .exec(function(err, user) {
          controller.emit('link-oauth', err, user, 'foursquare', req, res);
        });
    }
    return controller.emit('link-oauth', null, req.user, 'foursquare', req, res);
  };

  /**
   * Link Github account
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   */
  controller.linkGithub = function(req, res, next) {
    if (!req.user) {
      return User
        .findOne({ email: req._oauth.profile.email })
        .exec(function(err, user) {
          controller.emit('link-oauth', err, user, 'github', req, res);
        });
    }
    return controller.emit('link-oauth', null, req.user, 'github', req, res);
  };

  /**
   * Delete user
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   * @param {Function} next
   */
  controller.deleteAccount = function deleteAccount(req, res, next) {
    User.remove({ _id: req.user.id }).exec(function(err) {
      controller.emit('account-delete', controller, req, res);
    });
  };

  /**
   * Confirm account with token
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   * @param {Function} next
   */
  controller.confirmAccount = function confirmAccount(req, res, next) {
    User
      .findOne({ confirmAccountToken: req.params.token })
      .exec(function(err, user) {
        if (err) {
          req.flash('error', err.message);
          return res.redirect('/login');
        }

        if (!user) {
          req.flash('error', 'The token you provided is incorrect');
          return res.redirect('/login');
        }

        user.confirmAccount(function(err) {
          controller.emit('account-confirm', err, user, req, res);
        });
      });
  };

  /**
   * Confirm account with token
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   * @param {Function} next
   */
  controller.confirmReset = function confirmReset(req, res, next) {
    User
      .findOne({ resetToken: req.params.token })
      .exec(function(err, user) {
        if (err) {
          req.flash('error', 'There was an unexpected server error.');
          return res.redirect('/login');
        }

        if (!user) {
          req.flash('error', 'The token you provided is incorrect');
          return res.redirect('/login');
        }

        user.confirmReset(function(err) {
          controller.emit('confirm-reset', err, user, req, res);
        });
      });
  };

  /**
   * Reset account with token
   * @param {Error} err
   * @param {?User} user
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   */
  controller.on('confirm-reset', function(err, user, req, res) {
    if (err) {
      req.flash('error', 'There was an error deleting your account.');
      return res.redirect('/login');
    }
    
    req.login(user);
    req.flash('success', 'Logged in.');
    return res.redirect('/account');
  });

  /**
   * Redirect back to login after reset token is sent to user
   * @param  {Error} err
   * @param  {IncomingMessage} req
   * @param  {ServerResponse} res
   */
  controller.on('send-reset', function sendReset(err, user, req, res) {
    if (err) {
      req.flash('error', 'There was an error deleting your account.');
      return res.redirect('/login');
    }
    req.flash('success', 'You will receive a new login link at '+user.email+'.');
    return res.redirect('/login');
  });

  /**
   * Finish request after account is deleted
   * @param  {?Error} err
   * @param  {http.IncomingMessage} req
   * @param  {http.ServerResponse} res
   */
  controller.on('account-delete', function onDeleteAccount(err, req, res) {
    if (err) {
      req.flash('error', 'There was an error deleting your account.');
      return res.redirect('/account');
    }
    req.logout();
    req.flash("success", "Your account has been deleted.");
    return res.redirect('/');
  });

  /**
   * Confirm account with token
   * @param {Error} err
   * @param {?User} user
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   */
  controller.on('account-confirm', function onConfirmAccount(err, user, req, res) {
    if (err) {
      req.flash('error', 'There was an error confirming your account');
      return res.redirect('/login');
    }
    req.login(user);
    req.flash('success', 'Account confirmed');
    return res.redirect('/account');
  });

  /**
   * Callback used after User table is queried for user's with specified
   * email
   * @param  {?Error} err
   * @param  {?User} user
   * @param  {String} provider
   * @param  {IncomingMessage} req
   * @param  {ServerResponse} res
   * @return {Function}
   */
  controller.on('link-oauth', function(err, user, provider, req, res) {
    if (err) {
      req.flash('error', 'There was an unexpected server error.');
      return res.status(500).redirect(req.user ? '/account' : '/login');
    }

    req._oauth.provider = provider;

    user = user || req.user || new User();

    return user.linkOAuth(req._oauth, controller.onOauthLinked.bind(controller, req, res));
  });

  /**
   * Callback for linking Oauth
   * @param {?Error} err
   * @param {?User} user
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  controller.onOauthLinked = function(req, res, err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.status(500).redirect(req.user ? '/account' : '/login');
    }

    // Login user if no user logged in
    if (!req.user) {
      req.login(user);
    }

    req.flash('success', 'Account linked');
    res.render('pop');
    // res.redirect('/account');
  };

  /**
   * Callback to be called after OAuth provider is unlinked
   * @param {String} provider
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Error} err
   * @returns {Function}
   */
  controller.unlinkOAuth = function(req, res, next) {
    var provider = req.params.provider;

    req.user.unlinkOAuth(provider, function(err, user) {
      if (err) {
        req.flash("error", provider+" account could not be unlinked.");
        return res.redirect("/account");
      }
      
      req.flash("success", provider+" account unlinked!");
      return res.redirect("/account");
    });
  };

  /**
   * Finish request after local authentication has finished
   * @param  {Error} err
   * @param  {User} user
   * @param  {IncomingMessage} req
   * @param  {ServerResponse} res
   */
  controller.onAccountCreate = function(err, user, req, res) {
    if (err) {
      req.flash("error", "There was an error. Our developers are looking into it");
      return res.redirect("/login");
    }
    req.login(user);
    req.flash("success", "Account created.");
    res.redirect("/account");
  };

  /**
   * Log in user
   * @param  {User} user
   * @param  {http.IncomingMessage} req
   * @param  {http.ServerResponse} res
   */
  controller.onLogIn = function(user, req, res) {
    req.login(user);
    req.flash("success", "Logged In.");
    res.redirect("/account");
  };

  controller.on('login', controller.onLogIn);
  controller.on('account-create', controller.onAccountCreate);
  
  /**
   * Create router
   */
  var router = express.Router();

  /**
   * Routes
   */
  router.get('/reset/:token', controller.confirmReset);
  router.get('/confirm/:token', controller.confirmAccount);
  router.get('/delete', controller.deleteAccount);

  controller.router = router;

  return controller;

}

module.exports = UserController();
