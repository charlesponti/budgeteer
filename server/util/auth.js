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
 * Deserialize user
 * @param  {Request} req
 * @param {Response} res
 * @param {Function} next
 */
auth.deserializeUser = function(req, res, next) {
  if (req.session.user) {
    User 
      .findOne({ _id: req.session.user })
      .exec(auth.assignUserToReq.bind(null, req, next));
    return;
  }
  next();
};

/**
 * Assign user to request
 * @param  {Request}   req
 * @param  {Function} next
 * @param  {?Error}   err
 * @param  {?User}   user
 */
auth.assignUserToReq = function(req, next, err, user) {
  if (err) {
    throw err;
  }

  if (!user) {
    throw new Error('No user found');
  }
  
  req.user = user;
  next();
};

auth.deserializeUserCallback = 

module.exports = auth;
