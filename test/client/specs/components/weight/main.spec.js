describe('WeightMain', function() {
  'use strict';

  require('../../../spec_helper');

  var weight;
  var TestUtils = require('react/addons').addons.TestUtils;
  var WeightMain = require('../../../../../components/weight/main.jsx');

  beforeEach(function() {
    weight = TestUtils.renderIntoDocument(WeightMain);
  });

  afterEach(function() {
    weight = undefined;
  });

});
