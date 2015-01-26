'use strict';

describe('Router: UserRouter', function() {

  require('../../../server');

  var req, res, exec, user;
  var HttpFixtures = require('../fixtures/http');
  var router = require('../../../server/routers/UserRouter');
  var User = require('mongoose').model('User');

  beforeEach(function() {
    req = HttpFixtures.req();
    res = HttpFixtures.res();
    exec = jasmine.createSpy('exec');
    user = require('../fixtures/user');
    req.user = user;
    spyOn(user, 'save');
    spyOn(User, 'findOne').andReturn({
      exec: exec
    });
    spyOn(User, 'remove').andReturn({
      exec: exec
    });
  });

  afterEach(function() {
    req = undefined;
    res = undefined;
    user = undefined;
  });

  describe('.serve', function() {
    describe('.account()', function() {
      it('should call res.render with correct args', function() {
        req.isAuthenticated.andReturn(true);
        router.serve.account(req, res);
        expect(res.render).toHaveBeenCalledWith('users/account');
      });
    });
  });

  describe('.deleteAccount()', function() {
    it('should call User.remove with req.user._id', function() {
      router.deleteAccount(req, res);
      expect(User.remove.mostRecentCall.args[0]._id).not.toEqual(undefined);
      expect(exec).toHaveBeenCalled();
    });
  });

  describe('.confirmAccount()', function() {
    it('should call User.find with correct args', function() {
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
      router.onAccountDelete(req, res, new Error(), undefined);
      expect(req.flash).toHaveBeenCalledWith('error', 'There was an error deleting your account.');
      expect(res.redirect).toHaveBeenCalledWith('/account');
      expect(req.logout).not.toHaveBeenCalled();
    });
    it('should handle success', function() {
      router.onAccountDelete(req, res, undefined, undefined);
      expect(req.logout).toHaveBeenCalled();
      expect(req.flash).toHaveBeenCalledWith('success', 'Your account has been deleted.');
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
  });

  describe('.onAccountConfirm()', function() {
    it('should handle error', function() {
      router.onAccountConfirm(req, res, new Error(), null);
      expect(req.flash).toHaveBeenCalledWith('error', 'There was an error confirming your account');
      expect(res.redirect).toHaveBeenCalledWith('/login');
      expect(req.login).not.toHaveBeenCalled();
    });
    it('should handle success', function() {
      router.onAccountConfirm(req, res, null, 'foo');
      expect(req.login).toHaveBeenCalledWith('foo');
      expect(req.flash).toHaveBeenCalledWith('success', 'Account confirmed.');
      expect(res.redirect).toHaveBeenCalledWith('/account');
    });
  });

  describe('.unlinkOauth', function() {
    it('should call req.user.unlinkOAuth', function() {
      spyOn(router, 'onUnlinkOauth');
      spyOn(req.user, 'unlinkOAuth');
      req.params.provider = 'facebook';
      router.unlinkOAuth(req, res);
      expect(req.user.unlinkOAuth).toHaveBeenCalledWith('facebook', undefined);
    });
  });

  describe('.onUnlinkOauth()', function() {
    it('should return server error', function() {
      router.onUnlinkOauth(req, res, true);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Server error'
      });
    });
    it('should return success response', function() {
      router.onUnlinkOauth(req, res, undefined);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Account unlinked'
      });
    });
  });

  describe('.onAccountCreate()', function() {
    it('should return server error', function() {
      router.onAccountCreate(req, res, true);
      expect(req.login).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Server error'
      });
    });
    it('should return success response', function() {
      router.onAccountCreate(req, res, undefined);
      expect(req.login).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/account');
    });
  });

});
