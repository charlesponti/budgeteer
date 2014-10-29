describe("Util: auth", function() {
  "use strict";
  
  var Auth, req;
  var sinon = require("sinon");
  var expect = require("chai").expect;
  var auth = require('../../util/auth');
  var HttpFixtures = require('../fixtures/http');

  beforeEach(function() {
    Auth = auth;
    req = HttpFixtures.req();
  });

  afterEach(function() {
    Auth = null;
    req = null;
  });

  describe("#isAuthenticated", function() {
    it("should return true if user", function() {
      req.user = true;
      expect(Auth.isAuthenticated.apply(req)).to.equal(true);
    });
    it("should return false if no user", function() {
      req.user = false;
      expect(Auth.isAuthenticated.apply(req)).to.equal(false);
    });
  });

  describe("#logIn", function() {
    it("should set value of req.session", function() {
      Auth.logIn.call(req, { id: "foo" });
      expect(req.session.user).to.equal("foo");
    });
  });

  describe(".deserializeUser()", function() {
    var next;

    beforeEach(function() {
      next = sinon.spy();
    });

    afterEach(function() {
      next = undefined;
    });

    it("should call next if no req.session.user", function() {
      req.session.user = undefined;
      Auth.deserializeUser(req, undefined, next);
      expect(next.called).to.equal(true);
    });
    it("should call callback if req.session && req.session", function() {
      req.session.user = "meow";
      Auth.deserializeUser(req, undefined, next);
    });
  });

  describe('.deserializeUserCallback()', function() {
    it('should assign user to req', function() {
      var next = sinon.spy();
      Auth.deserializeUserCallback(req, null, next, null, 'foo');
      expect(req.user).to.equal('foo');
      expect(next.called).to.equal(true);
    });
  });

  describe(".logOut()", function() {
    it("should set value of req.session", function() {
      Auth.logOut.call(req);
      expect(req.session.user).to.equal(undefined);
    });
  });

});
