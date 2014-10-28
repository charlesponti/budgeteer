
var expect = require('chai').expect;
var HttpFixtures = require('../fixtures/http');
var AppRouter = require('../../server/routers/AppRouter');

describe('AppController', function() {
  'use strict';

  var req, res, router;


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

//  describe('#getAbout', function() {
//    it("should call res.render with correct string", function() {
//      AppController.getAbout(req, res);
//      expect(res.render.calledWith("static/about")).to.equal(true);
//    });
//  });
//
//  describe("#getRoot", function() {
//    it("should call res.render with correct string", function() {
//      AppController.getRoot(req, res);
//      expect(res.render.args[0][0]).to.equal("home");
//      expect(res.render.args[0][1].user.email).to.equal("foo@foo.com");
//    });
//  });

});
