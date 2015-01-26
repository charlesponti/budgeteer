'use strict';

describe('Task model', function() {

  require('../../../server');

  var task;
  var mongoose = require('mongoose');
  var Task = mongoose.model('Task');

  beforeEach(function() {
    task = new Task();
  });

  afterEach(function() {
    task = null;
  });

});
