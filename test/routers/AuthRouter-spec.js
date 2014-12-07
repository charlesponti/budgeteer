'use strict';

describe('Router: AuthRouter', function() {

  require('../spec_helper');

  var res, req, mockedreq;
  var router = require('../../server/routers/AuthRouter');

  beforeEach(function() {
    res = HttpFixtures.res();
    req = HttpFixtures.req();
    mockedreq = Object.create(req);
    mockedreq.user = null;
  });

  afterEach(function() {
    req = null;
    req = null;
    mockedreq = null;
  });

  describe('.linkOauth()', function() {

    var exec, sandbox;

    beforeEach(function() {
      exec = jasmine.createSpy('exec');
      spyOn(User, 'findOne').andCallFake(function() {
        return { exec: exec };
      });
      req.oauth = {
        profile: { email: 'foo@foo.com', emails: [{value: 'foo@foo.com'}]}
      };
    });

    afterEach(function() {
      req.oauth = null;
    });

    describe('Facebook', function() {
      it('should call User.findOne with correct query', function() {
        req.oauth.provider = 'facebook';
        router.linkOauth(req, res);
        expect(User.findOne).toHaveBeenCalledWith({
          email: 'foo@foo.com'
        });
      });
    });
    describe('Google', function() {
      it('should call User.findOne with correct query', function() {
        req.oauth.provider = 'google';
        router.linkOauth(req, res);
        expect(User.findOne).toHaveBeenCalledWith({
          email: 'foo@foo.com'
        });
      });
    });
    describe('Twitter', function() {
      it('should call User.findOne with correct query', function() {
        req.oauth.provider = 'twitter';
        router.linkOauth(req, res);
        expect(User.findOne).toHaveBeenCalledWith({
          email: 'foo@foo.com'
        });
      });
    });
    describe('Foursquare', function() {
      it('should call User.findOne with correct query', function() {
        req.oauth.provider = 'foursquare';
        router.linkOauth(req, res);
        expect(User.findOne).toHaveBeenCalledWith({
          email: 'foo@foo.com'
        });
      });
    });
    describe('Github', function() {
      it('should call User.findOne with correct query', function() {
        req.oauth.provider = 'github';
        router.linkOauth(req, res);
        expect(User.findOne).toHaveBeenCalledWith({
          email: 'foo@foo.com'
        });
      });
    });
  });

  describe('.onOauthLinked()', function() {

    beforeEach(function() {
      spyOn(req.user, 'linkOAuth');
      spyOn(req.user, 'hasProvider');
    });

    it('should handle error with req.user', function() {
      router.onOauthLinked(req, res, new Error(), null);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Server error'
      });
    });
    it('should handle success with req.user', function() {
      router.onOauthLinked(req, res, null, null);
      expect(req.login).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
    it('should handle success without req.user', function() {
      router.onOauthLinked(mockedreq, res, null, null);
      expect(req.login).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
  });

});
