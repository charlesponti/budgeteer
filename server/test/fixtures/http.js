"use strict";

var sinon = require('sinon');

module.exports = {

  /**
   * Return mocked Request
   * @param {?Boolean} noUser
   * @returns {object}
   */
  req: function(noUser) {
    var req = {
      body: {},
      query: {},
      params: {},
      session: {},
      flash: sinon.spy(),
      logout: sinon.spy(),
      login: sinon.spy(),
      isAuthenticated: sinon.stub()
    };

    // If noUser, return unauthenticated Request
    if (noUser) {
      req.user = undefined;
      return req;
    }

    req.user = require("./user").instance;
    return req;
  },

  /**
   * Mocked Response
   */
  res: function() {
    var res = {};

    res.json = sinon.spy();
    res.render = sinon.spy();
    res.redirect = sinon.spy();

    res.status = sinon.stub().returns({
      json: res.json,
      redirect: res.redirect
    });

    return res;
  }

};
