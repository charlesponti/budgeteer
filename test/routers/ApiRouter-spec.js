describe('Routers: ApiRouter', function() {
  'use strict';

  var req, res;
  var HttpFixtures = require('../fixtures/http');
  var ApiRouter = require('../../server/routers/api');

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
      req.isAuthenticated.andReturn(false);
      ApiRouter.getMe(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });
    it('should return send correct json if user not authenticated', function() {
      req.isAuthenticated.andReturn(false);
      ApiRouter.getMe(req, res);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No user signed in.'
      });
    });
    it('should return 200 if req is authenticated', function() {
      req.isAuthenticated.andReturn(true);
      ApiRouter.getMe(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should return send correct json if user not authenticated', function() {
      req.isAuthenticated.andReturn(true);
      ApiRouter.getMe(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });

});
