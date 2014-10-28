describe('TaskRouter', function() {
  
  'use strict';

  var req, res;
  var HttpFixtures = require('../fixtures/http');
  var TaskRouter = require('../../routers/TaskRouter');

  beforeEach(function() {
    req = HttpFixtures.req();
    res = HttpFixtures.res();
  });

  afterEach(function() {
    req = null;
    res = null;
  });

  // describe('.afterUpdate()', function() {
    // it('should', function() {
      // var fn = TaskRouter.afterUpdate();
  //   });
  // });

});
