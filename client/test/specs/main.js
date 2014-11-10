// Setup mocha
mocha.setup('bdd');

// Add Specs
require('./stores/BaseStore');
require('./stores/TaskStore');
require('./actions/AppActions');

// Run Specs
mocha.run();
