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

  describe('.logObj', function() {
    it('should log object', function() {
      sinon.spy(console, 'log');
      middleware.logObj('Foo', { bar: 'bar' });
      expect(console.log.getCall(0).args[0])
        .to.equal('\u001b[32mFoo\u001b[39m: \u001b[36m{"bar":"bar"}\u001b[39m');
      console.log.restore();
    });
  });

  describe('.csrf', function() {
    it('should call csrf if req not /api', function() {
      req.originalUrl = '/foo';
      middleware._csrf = sinon.spy();
      middleware.csrf(req, res, next);
      expect(middleware._csrf.called).to.equal(true);
    });
    it('should not call _csrf if req is /api', function() {
      req.originalUrl = '/api/foo';
      middleware._csrf = sinon.spy();
      middleware.csrf(req, res, next);
      expect(middleware._csrf.called).to.equal(false);
    });
    it('should return error if no access_token', function() {
      req.originalUrl = '/api/foo';
      middleware.csrf(req, res, next);
      expect(res.status.called).to.equal(true);
    });
    it('should not return error if access_token', function() {
      req.originalUrl = '/api/foo';
      req.query.access_token = 'foobar';
      middleware.csrf(req, res, next);
      expect(res.status.called).to.equal(false);
    });
  });

  describe('.onApiUser()', function() {
    it('should call next if error', function() {
      // middleware.emitter.emit('api-user', 'foo', null, req, res, next);
      // expect(next.called).to.equal(true);
      // expect(next.args[0][0]).to.equal('foo');
    });
  });

});
