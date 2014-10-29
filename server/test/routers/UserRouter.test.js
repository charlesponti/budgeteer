
describe('router', function() {

  'use strict';

  var req, res, noUserReq, User, user, router;
  var sinon = require('sinon');
  var expect = require('chai').expect;
  var HttpFixtures = require('../fixtures/http');
  var UserFixture = require('../fixtures/user');
  var UserRouter = require('../../routers/UserRouter');

  beforeEach(function() {
    User = UserFixture.model;
    user = UserFixture.instance;
    user.save = sinon.spy();
    req = HttpFixtures.req();
    noUserReq = HttpFixtures.req(true);
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
    describe('.login()', function() {
      it('should call res.render with correct args', function() {
        router.serve.login(req, res);
        expect(res.render.calledWith('users/login')).to.equal(true);
      });
    });
    describe('.account()', function() {
      it('should call res.render with correct args', function() {
        req.isAuthenticated = sinon.stub().returns(true);
        router.serve.account(req, res);
        expect(res.render.calledWith('users/account')).to.equal(true);
      });
    });
  });

  describe('.deleteAccount()', function() {
    it('should call User.remove with req.user._id', function() {
      var sandbox = sinon.sandbox.create();
      sandbox.spy(User, 'remove');
      req.user._id = '1';
      router.deleteAccount(req, res);
      expect(User.remove.calledWith({ _id: '1' })).to.equal(false);
      User.remove.restore();
    });
  });
  
  describe('.confirmAccount()', function() {
    it('should call User.find with correct args', function() {
      var exec = sinon.spy();
      var sandbox = sinon.sandbox.create();
      sandbox.stub(User, 'findOne', function() {
        return { exec: exec };
      });
      req.params.token = 'foobar';
      router.confirmAccount(req, res);
      expect(User.findOne.calledWith({ confirmAccountToken: 'foobar'})).to.equal(true);
      expect(exec.called).to.equal(true);
      sandbox.restore();
    });
  });


  describe('.onAccountDelete()', function() {
    it('should handle error', function() {
      var fn = router.onAccountDelete(req, res)(new Error(), undefined);
      expect(req.flash.getCall(0).args[0]).to.equal('error');
      expect(res.redirect.calledWith('/account'));
      expect(req.logout.called).to.equal(false);
    });
    it('should handle success', function() {
      var fn = router.onAccountDelete(req, res)(undefined, undefined);
      expect(req.logout.called).to.equal(true);
      expect(req.flash.getCall(0).args[0]).to.equal('success');
      expect(res.redirect.calledWith('/')).to.equal(true);
    });
  });

  describe('.onAccountConfirm()', function() {
    it('should handle error', function() {
      var fn = router.onAccountConfirm(req, res)(new Error(), null);
      expect(req.flash.getCall(0).args[0]).to.equal('error');
      expect(res.redirect.calledWith('/login'));
      expect(req.login.called).to.equal(false);
    });
    it('should handle success', function() {
      var fn = router.onAccountConfirm(req, res)(null, 'foo');
      expect(req.login.calledWith('foo')).to.equal(true);
      expect(req.flash.getCall(0).args[0]).to.equal('success');
      expect(res.redirect.calledWith('/account')).to.equal(true);
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

  describe('.onAccountCreate()', function() {
    var fn;

    beforeEach(function() {
      fn = router.onAccountCreate(req, res);
    });

    afterEach(function() {
      fn = null;
    });

    it('should return server error', function() {
      fn(new Error(), null);
      expect(req.login.called).to.equal(false);
      expect(res.status.args[0][0]).to.equal(500);
      expect(res.json.args[0][0].message).to.equal('Server error');
    });

    it('should return success response', function() {
      fn(null, User);
      expect(req.login.called).to.equal(true);
      expect(res.redirect.called).to.equal(true);
      expect(res.redirect.args[0][0]).to.equal('/account');
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
