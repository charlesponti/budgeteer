describe('Task model', function() {
  'use strict';

  var task;
  var Task = require('../../models/task');

  beforeEach(function() {
    task = new Task();
  });

  afterEach(function() {
    task = null;
  });

});
