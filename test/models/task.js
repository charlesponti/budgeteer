'use strict';

require('../spec_helper');

var chai = require('chai');
var expect = chai.expect;
var Task = require('../../server/models/task');

describe('Task model', function() {

  var task;

  beforeEach(function() {
    task = new Task();
  });

  afterEach(function() {
    task = null;
  });

});
