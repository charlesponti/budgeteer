"use strict";

var User = require('../models/user');

/**
 * Create auth object
 */  
var auth = {};

/**
 * Check if req is authenticated
 * The scope inside of this function will be that of req.
 * @return {Boolean}
 */
auth.isAuthenticated = function() {
  return !!this.user;
};

/**
 * Log in user
 * The scope inside of this function will be that of req.
 * @param  {User} user
 * @param  {Object} options
 */
auth.logIn = function(user) {
  this.session.user = user.id;
};

/**
 * Log out user
 * The scope inside of this function will be that of req.
 * @param  {User} user
 * @public
 */
auth.logOut = function() {
  delete this.session.user;
};

/**
 * Deserializer user
 * @param  {Function} callback
 * @return {Function}
 */
auth.deserializeUser = function(req, res, next) {
  if (req.session.user) {
    User 
      .findOne({ _id: req.session.user })
      .exec(auth.deserializeUserCallback.bind(auth, req, res, next));
    return;
  }
  next();
};

auth.deserializeUserCallback = function(req, res, next, err, user) {
  req.user = user;
  next();
};

module.exports = auth;
