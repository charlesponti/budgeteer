'use strict';

describe('Router: UserRouter', function() {

  var req, res, noUserReq, User, user;
  var HttpFixtures = require('../fixtures/http');
  var UserFixture = require('../fixtures/user');
  var router = require('../../server/routers/UserRouter');

  beforeEach(function() {
    User = UserFixture.model;
    user = UserFixture.instance;
    spyOn(user, 'save');
    req = HttpFixtures.req();
    noUserReq = HttpFixtures.req(true);
    res = HttpFixtures.res();
  });

  afterEach(function() {
    req =
    res =
    User =
    user = undefined;
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
        req.isAuthenticated.andReturns(true);
        router.serve.account(req, res);
        expect(res.render.calledWith('users/account')).to.equal(true);
      });
    });
  });

  describe('.deleteAccount()', function() {
    it('should call User.remove with req.user._id', function() {
      spyOn(User, 'remove');
      req.user._id = '1';
      router.deleteAccount(req, res);
      expect(User.remove).toHaveBeenCalledWith({ _id: '1' });
    });
  });

  describe('.confirmAccount()', function() {
    it('should call User.find with correct args', function() {
      var exec = jasmine.createSpy('exec');
      spyOn(User, 'findOne').andCallFake(function() {
        return { exec: exec };
      });
      req.params.token = 'foobar';
      router.confirmAccount(req, res);
      expect(User.findOne).toHaveBeenCalledWith({
        confirmAccountToken: 'foobar'
      });
      expect(exec).toHaveBeenCalled();
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
