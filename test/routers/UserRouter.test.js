
describe('router', function() {

  'use strict';

  var req, res, User, user, router;

  var sinon = require('sinon');
  var expect = require('chai').expect;
  var HttpFixtures = require('../fixtures/http');
  var UserFixture = require('../fixtures/user');
  var UserRouter = require('../../server/routers/UserRouter');

  beforeEach(function() {
    User = UserFixture.model;
    user = UserFixture.instance;
    user.save = sinon.spy();
    req = HttpFixtures.req();
    req.user = user;
    res = HttpFixtures.res();
    router = UserRouter;
  });

  afterEach(function() {
    User = null;
    user = null;
    req = null;
    res = null;
    router = null;
  });

  describe('Link Oauth Strategies', function() {

    var spy;

    beforeEach(function() {
      var spy = sinon.spy();
      sinon.spy(User, 'findOne');
      req._oauth = { profile: { email: 'foo@foo.com' } };
      sinon.stub(router.emitter, 'emit', spy);
    });

    afterEach(function() {
      User.findOne.restore();
      router.emit.restore();
    });

    describe('#linkFacebook', function() {
      it('should call User.findOne if no req.user', function() {
        req.user = null;
        router.linkFacebook(req, res);
        expect(User.findOne.called).to.equal(true);
      });
      it('should emit link-oauth if req.user', function() {
        router.linkFacebook(req, res);
        expect(User.findOne.called).to.equal(false);
        expect(router.emit.args[0][0]).to.equal('link-oauth');
      });
    });

    describe('#linkGoogle', function() {
      it('should call User.findOne if no req.user', function() {
        req.user = null;
        req._oauth = { profile: { emails: [{value: 'foo@foo.com'}] } };
        router.linkGoogle(req, res);
        expect(User.findOne.called).to.equal(true);
      });
      it('should emit link-oauth if req.user', function() {
        router.linkGoogle(req, res);
        expect(User.findOne.called).to.equal(false);
        expect(router.emit.args[0][0]).to.equal('link-oauth');
      });
    });

    describe('#linkTwitter', function() {
      it('should call User.findOne if no req.user', function() {
        req.user = null;
        router.linkTwitter(req, res);
        expect(User.findOne.called).to.equal(true);
      });
      it('should emit link-oauth if req.user', function() {
        router.linkTwitter(req, res);
        expect(User.findOne.called).to.equal(false);
        expect(router.emit.args[0][0]).to.equal('link-oauth');
      });
    });

    describe('#linkFoursquare', function() {
      it('should call User.findOne if no req.user', function() {
        req.user = null;
        router.linkFoursquare(req, res);
        expect(User.findOne.called).to.equal(true);
      });
      it('should emit link-oauth if req.user', function() {
        router.linkFoursquare(req, res);
        expect(User.findOne.called).to.equal(false);
        expect(router.emit.args[0][0]).to.equal('link-oauth');
      });
    });

    describe('#linkGithub', function() {
      it('should call User.findOne if no req.user', function() {
        req.user = null;
        router.linkGithub(req, res);
        expect(User.findOne.called).to.equal(true);
      });
      it('should emit link-oauth if req.user', function() {
        router.linkGithub(req, res);
        expect(User.findOne.called).to.equal(false);
        expect(router.emit.args[0][0]).to.equal('link-oauth');
      });
    });

  });
  
  describe('.serve', function() {
    describe(".login()", function() {
      it('should call res.render with correct args', function() {
        router.serve.login(req, res);
        expect(res.render.calledWith("users/login")).to.equal(true);
      });
    });
    describe(".account()", function() {
      it('should call res.render with correct args', function() {
        req.isAuthenticated = sinon.stub().returns(true);
        router.serve.account(req, res);
        expect(res.render.calledWith("users/account")).to.equal(true);
      });
    });
  });

  describe("#deleteAccount", function() {
    var exec;

    beforeEach(function() {
      exec = sinon.spy();
      User.remove = sinon.stub().returns({
        exec: exec
      });
    });

    afterEach(function() {
      User.remove.reset();
    });

    it("should set twitter token to undefined", function() {
      req.user._id = "1";
      router.deleteAccount(req, res);
      expect(User.remove.calledWith({ _id: "1" })).to.equal(false);
    });
  });

  describe("onDeleteAccount", function() {

    var next;

    beforeEach(function() {
      next = sinon.spy();
    });

    afterEach(function() {
      next = null;
    });

    describe("if error", function() {
      it("should call next with error", function() {
        router.emit('account-delete', true, req, res);
        expect(next.calledWith("foo"));
      });
      it("should not call req.logout", function() {
        router.emit('account-delete', true, req, res);
        expect(req.logout.called).to.equal(false);
      });
      it("should not call res.redirect", function() {
        router.emit('account-delete', true, req, res);
        expect(res.redirect.called).to.equal(true);
      });
    });

    describe("if no error", function() {
      it("should call req.logout", function() {
        router.emit('account-delete', null, req, res);
        expect(req.logout.called).to.equal(true);
      });
      it("should call req.flash with success", function() {
        router.emit('account-delete', null, req, res);
        expect(req.flash.calledWith("success", "Your account has been deleted."))
          .to.equal(true);
      });
      it("should call res.redirect with correct path", function() {
        router.emit('account-delete', null, req, res);
        expect(res.redirect.calledWith("/")).to.equal(true);
      });
    });
  });
  
  describe('.confirmAccount', function() {
    it('should call User.find with correct args', function() {
      req.params.token = 'foobar';
      var exec = sinon.spy();
      User.findOne = sinon.stub(User, 'findOne', function() {
        return { exec: exec };
      });
      router.confirmAccount(req, res);
      expect(User.findOne.calledWith({ confirmAccountToken: 'foobar'})).to.equal(true);
      expect(exec.called).to.equal(true);
    });
  });


  describe('account-delete', function() {
    it('should handle error', function() {
      router.emit('account-delete', true, req, res);
      expect(req.flash.getCall(0).args[0]).to.equal('error');
      expect(res.redirect.calledWith('/account'));
      expect(req.logout.called).to.equal(false);
    });
    it('should handle success', function() {
      router.emit('account-delete', false, req, res);
      expect(req.logout.called).to.equal(true);
      expect(req.flash.getCall(0).args[0]).to.equal('success');
      expect(res.redirect.calledWith('/')).to.equal(true);
    });
  });
  describe('account-confirm', function() {
    it('should handle error', function() {
      router.emit('account-confirm', true, null, req, res);
      expect(req.flash.getCall(0).args[0]).to.equal('error');
      expect(res.redirect.calledWith('/login'));
      expect(req.login.called).to.equal(false);
    });
    it('should handle success', function() {
      router.emit('account-confirm', false, 'foo', req, res);
      expect(req.login.calledWith('foo')).to.equal(true);
      expect(req.flash.getCall(0).args[0]).to.equal('success');
      expect(res.redirect.calledWith('/account')).to.equal(true);
    });
  });
  describe('oauth-linked', function() {
    it('should handle error with req.user', function() {
      var err = { message: 'foo' };
      router.emit('oauth-linked', err, null, req, res);
      expect(req.flash.calledWith('error', 'foo')).to.equal(true);
      expect(res.status.getCall(0).args[0]).to.equal(500);
      expect(res.redirect.getCall(0).args[0]).to.equal('/account');
    });
    it('should handle error without req.user', function() {
      var err = { message: 'foo' };
      req.user = null;
      router.emit('oauth-linked', err, null, req, res);
      expect(req.flash.calledWith('error', 'foo')).to.equal(true);
      expect(res.status.getCall(0).args[0]).to.equal(500);
      expect(res.redirect.getCall(0).args[0]).to.equal('/login');
    });
    it('should handle success with req.user', function() {
      req.user = null;
      router.emit('oauth-linked', null, 'foo', req, res);
      expect(req.login.getCall(0).args[0]).to.equal('foo');
      expect(req.flash.getCall(0).args[0]).to.equal('success');
      expect(res.redirect.getCall(0).args[0]).to.equal('/account');
    });
    it('should handle success without req.user', function() {
      router.emit('oauth-linked', null, 'foo', req, res);
      expect(req.login.called).to.equal(false);
      expect(req.flash.getCall(0).args[0]).to.equal('success');
      expect(res.redirect.getCall(0).args[0]).to.equal('/account');
    });
  });
  describe('link-oauth', function() {

    beforeEach(function() {
      req.user.linkOAuth = sinon.spy();
      req.user.hasProvider = sinon.stub();
      req._oauth = { token: 'fooToken', profile: { id: '123' } };
    });

    it('should handle error with req.user', function() {
      router.emit('link-oauth', true, null, 'foo', req, res);
      expect(req.flash.getCall(0).args[0]).to.equal('error');
      expect(res.status.args[0][0]).to.equal(500);
      expect(res.redirect.args[0][0]).to.equal('/account');
    });
    it('should handle error without req.user', function() {
      req.user = null;
      router.emit('link-oauth', true, null, 'foo', req, res);
      expect(req.flash.getCall(0).args[0]).to.equal('error');
      expect(res.status.args[0][0]).to.equal(500);
      expect(res.redirect.args[0][0]).to.equal('/login');
    });
    it('should handle success with req.user', function() {
      router.emit('link-oauth', false, null, 'foo', req, res);
      expect(req.user.linkOAuth.args[0][0]).to.equal('foo');
      expect(req.user.linkOAuth.args[0][1]).to.equal('fooToken');
      expect(req.user.linkOAuth.args[0][2].id).to.equal('123');
    });
  });

  describe('.unlinkOauth', function() {
    it('should call req.user.unlinkOAuth', function() {
      sinon.spy(router, 'onUnlinkOauth');
      sinon.spy(req.user, 'unlinkOAuth');
      req.params.provider = 'facebook';
      router.unlinkOAuth(req, res);
      expect(req.user.unlinkOAuth.called).to.equal(true);
      expect(req.user.unlinkOAuth.args[0][0]).to.equal('facebook');
      router.onUnlinkOauth.restore();
      req.user.unlinkOAuth.restore();
    });
  });

  describe('.onUnlinkOauth()', function() {

    var fn;

    beforeEach(function() {
      fn = router.onUnlinkOauth(req, res);
    });

    afterEach(function() {
      fn = null;
    });

    it('should return server error', function() {
      fn(new Error(), null);
      expect(res.status.args[0][0]).to.equal(500);
      expect(res.json.args[0][0].message).to.equal('Server error');
    });

    it('should return success response', function() {
      fn(null, User);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0].message).to.equal('Account unlinked');
    });

  });

  describe('.onLogIn()', function() {
    it('should login user', function() {
      router.onLogIn('foo', req, res);
      expect(req.login.args[0][0]).to.equal('foo');
      expect(req.flash.args[0][0]).to.equal('success');
      expect(res.redirect.args[0][0]).to.equal('/account');
    });
  });

});
