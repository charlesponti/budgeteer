'use strict';

describe('TaskRouter', function() {

  var req, res;
  var HttpFixtures = require('../fixtures/http');
  var TaskRouter = require('../../server/routers/api/TaskRouter');

  beforeEach(function() {
    req = HttpFixtures.req();
    res = HttpFixtures.res();
  });

  afterEach(function() {
    req = null;
    res = null;
  });

});
