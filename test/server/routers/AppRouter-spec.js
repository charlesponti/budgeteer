'use strict';

describe('Routers: AppRouter', function() {

  var req, res, router;
  var HttpFixtures = require('../fixtures/http');
  var AppRouter = require('../../../server/routers/AppRouter');

  beforeEach(function() {
    router = AppRouter;
    req = HttpFixtures.req();
    res = HttpFixtures.res();
  });

  afterEach(function() {
    router = null;
    req = null;
    res = null;
  });

  describe('.about()', function() {
    it("should call res.render with correct view", function() {
      router.about(req, res);
      expect(res.render).toHaveBeenCalledWith('static/about');
    });
  });

  describe('.error()', function() {
    it('should call req.flash', function() {

    });
    it('should call res.redirect', function() {

    });
  });

  describe(".all()", function() {
    it('should render home if req is not authenticated', function() {
      router.all(req, res);
      expect(res.render).toHaveBeenCalledWith('home');
    });
    it('should render layout if req is authenticated', function() {
      req.isAuthenticated.andReturn(true);
      req.user = 'foo@foo.com';
      router.all(req, res);
      expect(res.render).toHaveBeenCalledWith('layout', {
        current_user: 'foo@foo.com'
      });
    });
  });

});
