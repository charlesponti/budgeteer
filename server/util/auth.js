"use strict";


var User = require('../models/user');

/**
 * `Auth` constructor
 * @constructor
 * @public
 */
function Auth() {
  
  var self = this;

  /**
   * Check if req is authenticated
   * The scope inside of this function will be that of req.
   * @return {Boolean}
   */
  this.isAuthenticated = function() {
    return !!this.user;
  };

  /**
   * Log in user
   * The scope inside of this function will be that of req.
   * @param  {User} user
   * @param  {Object} options
   */
  this.logIn = function(user) {
    this.session.user = user.id;
  };

  /**
   * Log out user
   * The scope inside of this function will be that of req.
   * @param  {User} user
   * @public
   */
  this.logOut = function() {
    delete this.session.user;
  };

  /**
   * Deserializer user
   * @param  {Function} callback
   * @return {Function}
   */
  this.deserializeUser = function(req, res, next) {
    if (req.session.user) {
      User 
        .findOne({ _id: req.session.user })
        .exec(function(err, user) {
          req.user = user;
          next();
        });
    }
    next();
  };

}

module.exports = new Auth();
