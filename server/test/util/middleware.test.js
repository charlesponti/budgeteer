describe("Cthulhu middleware", function() {
  "use strict";

  require('../spec_helper');

  var req, res, next;
  var middleware = require("../../util/middleware");

  beforeEach(function() {
    req = HttpFixtures.req();
    res = HttpFixtures.res();
    next = sinon.spy();
  });

  afterEach(function() {
    req = null;
    res = null;
  });

  describe('.csrf', function() {

    var exec, sandbox;

    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      exec = sinon.spy();
      sandbox.stub(User, 'findOne', function() {
        return { exec: exec };
      });
      sandbox.stub(middleware, '_csrf');
      sandbox.stub(middleware, 'onApiUser');
    });

    afterEach(function() {
      exec = undefined;
      sandbox.restore();
    });

    it('should call csrf if req not /api', function() {
      req.originalUrl = '/foo';
      middleware.csrf(req, res, next);
      expect(middleware._csrf.called).to.equal(true);
    });
    it('should call _csrf if no access_token', function() {
      req.originalUrl = '/api/foo';
      middleware.csrf(req, res, next);
      expect(middleware._csrf.called).to.equal(true);
    });
    it('should not call _csrf if access_token', function() {
      req.originalUrl = '/api/foo';
      req.query.access_token = 'foobar';
      middleware.csrf(req, res, next);
      expect(User.findOne.called).to.equal(true);
      expect(middleware.onApiUser.called).to.equal(true);
      expect(middleware._csrf.called).to.equal(false);
    });
  });

});
