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
    var next, sandbox;

    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      sandbox.stub(User, 'findOne', function() {
        return { exec: sinon.spy() };
      });
      next = sinon.spy();
    });

    afterEach(function() {
      next = undefined;
      sandbox.restore();
    });

    it("should call next if no req.session.user", function() {
      req.session.user = undefined;
      Auth.deserializeUser(req, undefined, next);
      expect(User.findOne.called).to.equal(false);
      expect(next.called).to.equal(true);
    });
    it('should find user if req.session.user', function() {
      req.session.user = '1234';
      Auth.deserializeUser(req, undefined, next);
      expect(User.findOne.args[0][0]).to.deep.equal({ _id: '1234'});
      expect(next.called).to.equal(false);
    });
  });

  describe('.assignUserToReq()', function() {
    it('should assign user to req', function() {
      var next = sinon.spy();
      Auth.assignUserToReq(req, next, null, 'foo');
      expect(req.user).to.equal('foo');
    });
  });

  describe(".logOut()", function() {
    it("should set value of req.session", function() {
      Auth.logOut.call(req);
      expect(req.session.user).to.equal(undefined);
    });
  });

});
