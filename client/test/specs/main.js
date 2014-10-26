// Setup mocha
mocha.setup('bdd');

// Add Specs
require('./stores/BaseStore');
require('./stores/TaskStore');

// Run Specs
mocha.run();
