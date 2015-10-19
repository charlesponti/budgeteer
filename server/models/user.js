"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

/**
 * User Schema
 * @type {mongoose.Schema}
 */
var UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  accessToken: {  type: String,  unique: true, sparse: true },
  resetPasswordToken: {  type: String, unique: true, sparse: true },
  confirmAccountToken: {  type: String, unique: true, sparse: true },
  facebook: {
    id: { type: String, unique: true, sparse: true },
    name: String,
    photo: String,
    token: String,
    profile: Schema.Types.Mixed
  },
  twitter: {
    id: { type: String, unique: true, sparse: true },
    name: String,
    photo: String,
    token: String,
    profile: Schema.Types.Mixed
  },
  google: {
    id: { type: String, unique: true, sparse: true },
    name: String,
    photo: String,
    token: String,
    profile: Schema.Types.Mixed
  },
  foursquare: {
    id: { type: String, unique: true, sparse: true },
    name: String,
    photo: String,
    token: String,
    profile: Schema.Types.Mixed
  },
  github: {
    id: { type: String, unique: true, sparse: true },
    name: String,
    photo: String,
    token: String,
    profile: Schema.Types.Mixed
  },
  authy: {
    id: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    country_code: { type: String, sparse: true },
    token: { type: String, unique: true, sparse: true }
  }
});

UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.accessToken = this.makeToken();
    if (!this.is_connected()) {
      this.confirmAccountToken = this.makeToken();
      app.mailer.emails.users.welcome(this);
    }
  }
  next();
});

/**
 * User methods
 * @type {mongoose.Schema.methods}
 */
UserSchema.methods = {

  /**
   * Send reset token to user
   * @return {User}
   */
  sendReset: function(callback) {
    this.resetToken = this.makeToken();
    this.save(callback);
  },

  /**
   * Get user's email from their OAuth provider profile
   * @param  {String} provider Name of OAuth provider
   * @param  {Object} profile  User's profle from OAuth provider
   * @return {String} Email of user
   */
  getEmail: function(provider, profile) {
    var email;

    switch(provider) {
      case 'google':
        email = profile.emails[0].value;
        break;
      case 'facebook':
      case 'github':
      case 'twitter':
      case 'foursquare':
        email = profile.email;
        break;
      default:
        throw new Error('You have supplied an unsupported provider:', provider);
    }

    return email;
  },

  /**
   * Check if user has provider and if the profile id matches
   * @param {String} provider Name of OAuth provider
   * @param {String|Number} id Id of user on OAuth provider
   * @returns {Boolean}
   */
  hasProvider: function(provider, id) {
    return this[provider] && (this[provider].id == id);
  },

  linkAuthy: function(authyResponse, callback) {
    this.authy.id = authyResponse.id;
    this.authy.token = authyResponse.token;
    this.save(callback);
  },

  /**
   * Link user's OAuth provider account
   * @param {String} provider
   * @param {String} token
   * @param {Object} profile
   * @param {Function} callback
   * @return {User}
   * @api public
   */
  linkOAuth: function(oauth, callback) {
    var profile = oauth.profile;
    var provider = oauth.provider;

    if (!this.email) {
      this.email = this.getEmail(provider, profile);
    }

    this[provider].id = profile.id;
    this[provider].profile = profile;
    this[provider].token = oauth.token;
    this[provider].photo = this.getOAuthPhoto(provider, profile);
    this[provider].name = this.getOAuthName(provider, profile);
    this.save(callback);
    return this;
  },

  /**
   * Unlink user's Facebook account
   * @param {String} provider
   * @param {Function} callback
   * @return {User}
   * @api public
   */
  unlinkOAuth: function(provider, callback) {
    if (this[provider]) {
      this[provider] = undefined;
    }
    this.save(callback);
    return this;
  },

  /**
   * Return url for user's provider photo
   * @param {string} provider
   * @param {object} profile
   * @return {String}
   * @api public
   */
  getOAuthPhoto: function(provider, profile) {
    switch (provider) {
      case 'facebook':
        return 'https://graph.facebook.com/'+profile.id+'/picture?type=large';
      case 'google':
        return profile.image.url.replace("sz=50", "sz=200");
      case 'foursquare':
        return profile.photo.prefix+'original'+profile.photo.suffix;
      case 'twitter':
        return profile.profile_image_url.replace("_normal", "");
      case 'github':
        return profile.avatar_url;
    }
  },

  /**
   * Return name of user on provider
   * @param {string} provider
   * @param {object} profile
   * @return {String}
   * @api public
   */
  getOAuthName: function(provider, profile) {
    // TODO Store user screenname/email from provider
    // {{ current_user.facebook.profile.email }}
    // {{ current_user.twitter.profile.screen_name }}
    // {{ current_user.google.profile.emails[0].value }}
    // {{ current_user.foursquareName() }}
    // {{ current_user.github.profile.login }}
    switch(provider) {
      case 'facebook':
      case 'github':
      case 'twitter':
        return profile.name;
      case 'google':
        return profile.displayName;
      case 'foursquare':
        return profile.firstName + " " + profile.lastName;
    }
  },

  /**
   * Determine if user has any linked social networks
   * @return {Boolean}
   */
  is_connected: function() {
    return this.foursquare.token ||
            this.facebook.token ||
            this.google.token ||
            this.twitter.token;
  },

  /**
   * Make random token
   * @return {String}
   * @public
   */
  makeToken: function() {
    return crypto.randomBytes(32).toString('base64');
  },

  /**
   * Make random token
   * @return {Number}
   * @private
   */
  makeSixDigitToken: function() {
    return Math.floor(Math.random() * 100000) + 300000;
  },

  /**
   * Perform logic when account is confirmed
   * @return {User}
   */
  confirmAccount: function(callback) {
    this.confirmAccountToken = undefined;
    this.save(callback);
  },

  /**
   * Perform logic when account is confirmed
   * @return {User}
   */
  confirmReset: function(callback) {
    this.resetToken = undefined;
    this.save(callback);
  }

};

const User = mongoose.model('User', UserSchema);

module.exports = User;
