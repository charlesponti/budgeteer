describe('Router: AuthRouter', function() {
  'use strict';

  require('../spec_helper');

  var res, req, mockedreq;
  var AuthRouter = require('../../routers/AuthRouter');

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
      sandbox = sinon.sandbox.create();
      exec = sandbox.spy();
      sandbox.spy(User, 'findOne', function() {
        return { exec: exec };
      });
      req._oauth = {
        profile: { email: 'foo@foo.com', emails: [{value: 'foo@foo.com'}]}
      };
    });

    afterEach(function() {
      req._oauth = null;
      sandbox.restore();
    });

    describe('Facebook', function() {
      it('should call User.findOne with correct query', function() {
        req._oauth.provider = 'facebook';
        AuthRouter.linkOauth(req, res);
        expect(User.findOne.getCall(0).args[0]).to.deep.equal({
          email: 'foo@foo.com'
        });
      });
    });
    describe('Google', function() {
      it('should call User.findOne with correct query', function() {
        req._oauth.provider = 'google';
        AuthRouter.linkOauth(req, res);
        expect(User.findOne.getCall(0).args[0]).to.deep.equal({
          email: 'foo@foo.com'
        });
      });
    });
    describe('Twitter', function() {
      it('should call User.findOne with correct query', function() {
        req._oauth.provider = 'twitter';
        AuthRouter.linkOauth(req, res);
        expect(User.findOne.getCall(0).args[0]).to.deep.equal({
          email: 'foo@foo.com'
        });
      });
    });
    describe('Foursquare', function() {
      it('should call User.findOne with correct query', function() {
        req._oauth.provider = 'foursquare';
        AuthRouter.linkOauth(req, res);
        expect(User.findOne.getCall(0).args[0]).to.deep.equal({
          email: 'foo@foo.com'
        });
      });
    });
    describe('Github', function() {
      it('should call User.findOne with correct query', function() {
        req._oauth.provider = 'github';
        AuthRouter.linkOauth(req, res);
        expect(User.findOne.getCall(0).args[0]).to.deep.equal({
          email: 'foo@foo.com'
        });
      });
    });
  });

  describe('.onOauthLinked()', function() {

    beforeEach(function() {
      sinon.spy(req.user, 'linkOAuth');
      sinon.spy(req.user, 'hasProvider');
    });

    afterEach(function() {
      req.user.linkOAuth.restore();
      req.user.hasProvider.restore();
    });

    it('should handle error with req.user', function() {
      AuthRouter.onOauthLinked(req, res, new Error(), null);
      expect(res.status.args[0][0]).to.equal(500);
      expect(res.json.args[0][0].message).to.equal('Server error');
    });
    it('should handle success with req.user', function() {
      AuthRouter.onOauthLinked(req, res, null, null);
      expect(req.login.called).to.equal(false);
      expect(res.render.called).to.equal(true);
      expect(res.render.args[0][0]).to.equal('pop');
    });
    it('should handle success without req.user', function() {
      AuthRouter.onOauthLinked(mockedreq, res, null, null);
      expect(req.login.called).to.equal(true);
      expect(res.render.called).to.equal(true);
      expect(res.render.args[0][0]).to.equal('pop');
    });
  });

});
