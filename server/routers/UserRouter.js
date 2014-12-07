'use strict';

var _ = require('lodash');
var cthulhu = require('cthulhu');
var User = require('../models/user');

// Create router
var router = cthulhu.Router();

/**
 * Sign up user through two-factor authentication
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
router.logIn = function(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .exec(function(err, user) {

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
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   */
  login: function(req, res) {
    if (req.isAuthenticated()) {
      return res.redirect('/account');
    }
    return res.render('users/login');
  },
  /**
   * Serve account page
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   */
  account: function(req, res, next) {
    if (req.isAuthenticated()) {
      return res.render('users/account');
    }
    return res.redirect('users/login');
  }
};

/**
 * Log out user
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
router.logOut = function(req, res, next) {
  req.logout();
  res.redirect("/");
};

/**
 * Delete user
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
router.deleteAccount = function(req, res, next) {
  User
    .remove({ _id: req.user.id })
    .exec(router.onAccountDelete.bind(router, req, res));
};

/**
 * Finish request after account is deleted
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 * @param {Error} err
 * @param {?User} user
 */
router.onAccountDelete = function(req, res, err, user) {
  if (err) {
    req.flash('error', 'There was an error deleting your account.');
    return res.redirect('/account');
  }
  req.logout();
  req.flash("success", "Your account has been deleted.");
  return res.redirect('/');
};

/**
 * Confirm account with token
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
router.confirmAccount = function(req, res, next) {
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

      user.confirmAccount(router.onAccountConfirm.bind(router, req, res));
    });
};

/**
 * Confirm account with token
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
router.confirmReset = function(req, res, next) {
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

      user.confirmReset(router.confirmReset.bind(router, req, res));
    });
};

/**
 * Reset account with token
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Error} err
 * @param {?User} user
 */
router.confirmReset = function(req, res, err, user) {
  if (err) {
    req.flash('error', 'There was an error deleting your account.');
    return res.redirect('/login');
  }
  req.login(user);
  req.flash('success', 'Logged in.');
  return res.redirect('/account');
};

/**
 * Redirect back to login after reset token is sent to user
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
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
 * Confirm account with token
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Error} err
 * @param {?User} user
 */
router.onAccountConfirm = function(req, res, err, user) {
  if (err) {
    req.flash('error', 'There was an error confirming your account');
    return res.redirect('/login');
  }

  req.login(user);
  req.flash('success', 'Account confirmed.');
  return res.redirect('/account');
};

/**
 * Callback to be called after OAuth provider is unlinked
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @returns {Function}
 */
router.unlinkOAuth = function(req, res) {
  req.user.unlinkOAuth(req.params.provider, router.onUnlinkOauth(req, res));
};

/**
 * Handle response after
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {?Error} err
 * @returns {*}
 */
router.onUnlinkOauth = function(req, res, err) {
  if (err) {
    return res.status(500).json({ message: 'Server error' });
  }
  return res.status(200).json({ message: 'Account unlinked' });
};

/**
 * Finish request after local authentication has finished
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 * @param  {Error} err
 * @param  {User} user
 */
router.onAccountCreate = function(req, res, err, user) {
  if (err) {
    return res.status(500).json({ message: 'Server error' });
  }

  req.login(user);
  return res.redirect("/account");
};

/**
 * Log in user
 * @param  {User} user
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
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
