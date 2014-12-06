"use strict";

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
      flash: jasmine.createSpy('flash'),
      logout: jasmine.createSpy('logout'),
      login: jasmine.createSpy('login'),
      isAuthenticated: jasmine.createSpy('isAuthenticated')
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

    res.json = jasmine.createSpy('json');
    res.render = jasmine.createSpy('render');
    res.redirect = jasmine.createSpy('redirect');

    res.status = jasmine.createSpy('status').andReturn({
      json: res.json,
      redirect: res.redirect
    });

    return res;
  }

};
