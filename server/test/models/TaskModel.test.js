'use strict';

var chai = require('chai');
var expect = chai.expect;
var Task = require('../../models/task');

describe('Task model', function() {

  var task;

  beforeEach(function() {
    task = new Task();
  });

  afterEach(function() {
    task = null;
  });

});
