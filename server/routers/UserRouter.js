'use strict';

/**
 * Module dependencies
 * @type {exports}
 * @private
 */
var _ = require('lodash');
var express = require('express');

/**
 * Application dependencies
 * @type {exports}
 * @private
 */
var User = require('../models/user');

/**
 * Create router
 */
var router = express.Router();

/**
 * Sign up user through two-factor authentication
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
router.logIn = function(req, res, next) {
  User.findOne({ email: req.body.email }).exec(function(err, user) {

    if (err) {
      req.flash('error', 'There was an unexpected server error.');
      return res.redirect('/login');
    }

    if (user) {
      return user.sendReset(router.sendReset(req, res));
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
router.serve = {
  /**
   * Serve sign up page
   * @param {Request} req
   * @param {Response} res
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
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
router.logOut = function(req, res, next) {
  req.logout();
  res.redirect("/");
};

/**
 * Link Facebook account
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
router.linkFacebook = function(req, res, next) {
  if (!req.user) {
    return User
      .findOne({ email: req._oauth.profile.email })
      .exec(router.linkOauth('facebook', req, res));
  }
  return router.emit('link-oauth', null, req.user, 'facebook', req, res);
};

/**
 * Link Google account
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
router.linkGoogle = function(req, res, next) {
  if (!req.user) {
    return User
      .findOne({ email: req._oauth.profile.emails[0].value })
      .exec(function(err, user) {
        router.emit('link-oauth', err, user, 'google', req, res);
      });
  }
  return router.emit('link-oauth', null, req.user, 'google', req, res);
};

/**
 Link Twitter account
 @param {string} token Twitter access token
 @param {string} secret Twitter token secret
 @param {object} profile Twitter profile
 @param {Request} req
 @param {Response} res
 */
router.linkTwitter = function(req, res, next) {
  if (!req.user) {
    return User
      .findOne({ email: req._oauth.profile.email })
      .exec(function(err, user) {
        router.emit('link-oauth', err, user, 'twitter', req, res);
      });
  }
  return router.emit('link-oauth', null, req.user, 'twitter', req, res);
};

/**
 * Link Foursquare account
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
router.linkFoursquare = function(req, res, next) {
  if (!req.user) {
    User
      .findOne({ email: req._oauth.profile.email })
      .exec(function(err, user) {
        router.emit('link-oauth', err, user, 'foursquare', req, res);
      });
  }
  return router.emit('link-oauth', null, req.user, 'foursquare', req, res);
};

/**
 * Link Github account
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
router.linkGithub = function(req, res, next) {
  if (!req.user) {
    return User
      .findOne({ email: req._oauth.profile.email })
      .exec(function(err, user) {
        router.emit('link-oauth', err, user, 'github', req, res);
      });
  }
  return router.emit('link-oauth', null, req.user, 'github', req, res);
};

/**
 * Delete user
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
router.deleteAccount = function deleteAccount(req, res, next) {
  User.remove({ _id: req.user.id }).exec(function(err) {
    router.emit('account-delete', router, req, res);
  });
};

/**
 * Confirm account with token
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
router.confirmAccount = function confirmAccount(req, res, next) {
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
        router.emit('account-confirm', err, user, req, res);
      });
    });
};

/**
 * Confirm account with token
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
router.confirmReset = function confirmReset(req, res, next) {
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
        router.emit('confirm-reset', err, user, req, res);
      });
    });
};

/**
 * Reset account with token
 * @param {Request} req
 * @param {Response} res
 */
router.confirmReset = function(req, res) {
  /**
   * @param {Error} err
   * @param {?User} user
   */
  return function(err, user) {
    if (err) {
      req.flash('error', 'There was an error deleting your account.');
      return res.redirect('/login');
    }
    req.login(user);
    req.flash('success', 'Logged in.');
    return res.redirect('/account');
  }
};

/**
 * Redirect back to login after reset token is sent to user
 * @param  {Request} req
 * @param  {Response} res
 */
router.sendReset = function(req, res) {
  /**
   * @param {?error} err
   * @param {?User} user
   */
  return function(err, user) {
    if (err) {
      req.flash('error', 'There was an error deleting your account.');
      return res.redirect('/login');
    }
    req.flash('success', 'You will receive a new login link at '+user.email+'.');
    return res.redirect('/login');
  };
};

/**
 * Finish request after account is deleted
 * @param  {?Error} err
 * @param  {Request} req
 * @param  {Response} res
 */
router.onAccountDelete = function(err, req, res) {
  return function(err, user) {
    if (err) {
      req.flash('error', 'There was an error deleting your account.');
      return res.redirect('/account');
    }
    req.logout();
    req.flash("success", "Your account has been deleted.");
    return res.redirect('/');
  };
};

/**
 * Confirm account with token
 * @param {Request} req
 * @param {Response} res
 */
router.onAccountConfirm = function(req, res) {
  /**
   * @param {Error} err
   * @param {?User} user
   */
  return function(err, user) {
    if (err) {
      req.flash('error', 'There was an error confirming your account');
      return res.redirect('/login');
    }
    req.login(user);
    req.flash('success', 'Account confirmed');
    return res.redirect('/account');
  };
};

/**
 * Callback used after User table is queried for user's with specified
 * email
 * @param  {String} provider
 * @param  {Request} req
 * @param  {Response} res
 * @return {Function}
 */
router.linkOauth = function(provider, req, res) {
  /**
   * @param  {?Error} err
   * @param  {?User} user
   */
  return function(err, user) {
    if (err) {
      req.flash('error', 'There was an unexpected server error.');
      return res.status(500).redirect(req.user ? '/account' : '/login');
    }

    req._oauth.provider = provider;

    user = user || req.user || new User();

    return user.linkOAuth(req._oauth, router.onOauthLinked.bind(router, req, res));
  }
};

/**
 * Callback for linking Oauth
 * @param {?Error} err
 * @param {?User} user
 * @param {Request} req
 * @param {Response} res
 */
router.onOauthLinked = function(req, res, err, user) {
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
 * @param {Request} req
 * @param {Response} res
 * @returns {Function}
 */
router.unlinkOAuth = function(req, res) {
  var provider = req.params.provider;

  req.user.unlinkOAuth(provider, router.onUnlinkOauth(req, res));
};

/**
 * Handle response after
 * @param {Request} req
 * @param {Response} res
 * @returns {*}
 */
router.onUnlinkOauth = function(req, res) {
  /**
   * @param {?Error} err
   */
  return function(err) {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    return res.status(200).json({ message: 'Account unlinked' })
  };
};

/**
 * Finish request after local authentication has finished
 * @param  {Request} req
 * @param  {Response} res
 */
router.onAccountCreate = function(req, res) {
  /**
   * @param  {Error} err
   * @param  {User} user
   */
  return function(err, user) {
    if (err) {
      return res.status(500).json({ message: 'Server Error' });
    }

    req.login(user);
    return res.redirect("/account");
  };
};

/**
 * Log in user
 * @param  {User} user
 * @param  {Request} req
 * @param  {Response} res
 */
router.onLogIn = function(user, req, res) {
  req.login(user);
  req.flash("success", "Logged In.");
  res.redirect("/account");
};

/**
 * Routes
 */
router.get('/reset/:token', router.confirmReset);
router.get('/confirm/:token', router.confirmAccount);
router.get('/delete', router.deleteAccount);

module.exports = router;
