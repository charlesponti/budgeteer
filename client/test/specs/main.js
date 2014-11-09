// Setup mocha
mocha.setup('bdd');

// Add Specs
require('./stores/BaseStore');
require('./stores/TaskStore');
require('./actions/TaskActions');

// Run Specs
mocha.run();
