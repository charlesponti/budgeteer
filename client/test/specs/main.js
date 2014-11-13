'use strict';

// Setup mocha
mocha.setup('bdd');

// Add expect to window
window.expect = chai.expect;

var React =
window.React = require('react/addons');

window.TestUtils = React.addons.TestUtils;

// Add require helper
window.testRequire = function(path) {
  return require('../../app/'+path);
};

// Add Specs
require('./stores/BaseStore');
require('./stores/TaskStore');
require('./actions/AppActions');
require('./components/tasks/Form.jsx');

// Run Specs
mocha.run();
