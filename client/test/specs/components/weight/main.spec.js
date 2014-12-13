describe('WeightMain', function() {
  'use strict';

  var weight;
  var TestUtils = require('react/addons').addons.TestUtils;
  var WeightMain = require('../../../../app/components/weight/main.jsx');

  beforeEach(function() {
    weight = TestUtils.renderIntoDocument(WeightMain);
  });

  afterEach(function() {
    weight = undefined;
  });

});
