describe('Routers: ApiRouter', function() {
  'use strict';

  var req, res;
  var ApiRouter = require('../../routers/ApiRouter');

  beforeEach(function() {
    req = HttpFixtures.req();
    res = HttpFixtures.res();
  });

  afterEach(function() {
    req = undefined;
    res = undefined;
  });

  describe('#getMe', function() {
    it('should return 400 if req not authenticated', function() {
      req.isAuthenticated.returns(false);
      ApiRouter.getMe(req, res);
      expect(res.status.called).to.equal(true);
      expect(res.status.args[0][0]).to.equal(401);
    });
    it('should return send correct json if user not authenticated', function() {
      req.isAuthenticated.returns(false);
      ApiRouter.getMe(req, res);
      expect(res.json.called).to.equal(true);
      expect(res.json.args[0][0].message).to.equal('No user signed in.');
    });
    it('should return 200 if req is authenticated', function() {
      req.isAuthenticated.returns(true);
      ApiRouter.getMe(req, res);
      expect(res.status.called).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
    });
    it('should return send correct json if user not authenticated', function() {
      req.isAuthenticated.returns(true);
      ApiRouter.getMe(req, res);
      expect(res.json.called).to.equal(true);
    });
  });

});
