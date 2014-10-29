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

    beforeEach(function() {
      req._oauth = { provider: 'facebook' };
    });

    afterEach(function() {
      req._oauth = null;
    });

    it('should handle error with req.user', function() {
      var err = { message: 'foo' };
      AuthRouter.linkOauth(req, res)(new Error(), null);
      expect(req.flash.calledWith('error', 'foo')).to.equal(true);
      expect(res.status.getCall(0).args[0]).to.equal(500);
      expect(res.redirect.getCall(0).args[0]).to.equal('/account');
    });
    it('should handle error without req.user', function() {
      AuthRouter.linkOauth(mockedreq, res)(new Error(), null);
      expect(req.flash.calledWith('error', 'foo')).to.equal(true);
      expect(res.status.getCall(0).args[0]).to.equal(500);
      expect(res.redirect.getCall(0).args[0]).to.equal('/login');
    });
    it('should handle success with req.user', function() {
      AuthRouter.linkOauth(req, res)(undefined, undefined);
      expect(req.login.getCall(0).args[0]).to.equal('foo');
      expect(req.flash.getCall(0).args[0]).to.equal('success');
      expect(res.redirect.getCall(0).args[0]).to.equal('/account');
    });
    it('should handle success without req.user', function() {
      var mockedreq = (req);
      mockedreq.user = null;
      AuthRouter.linkOauth(mockedreq, res)(undefined, undefined);
      expect(req.login.called).to.equal(false);
      expect(req.flash.getCall(0).args[0]).to.equal('success');
      expect(res.redirect.getCall(0).args[0]).to.equal('/account');
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
      AuthRouter.onOauthLinked(req, res)(new Error(), null);
      expect(res.status.args[0][0]).to.equal(500);
      expect(res.json.args[0][0].message).to.equal('Server error');
    });
    it('should handle success with req.user', function() {
      AuthRouter.onOauthLinked(req, res)(null, null);
      expect(req.login.called).to.equal(false);
      expect(res.render.called).to.equal(true);
      expect(res.render.args[0][0]).to.equal('pop');
    });
    it('should handle success without req.user', function() {
      var mockedReq = Object.create(req);
      mockedReq.user = null;
      AuthRouter.onOauthLinked(mockedReq, res)(null, null);
      expect(req.login.called).to.equal(true);
      expect(res.render.called).to.equal(true);
      expect(res.render.args[0][0]).to.equal('pop');
    });
  });

});
