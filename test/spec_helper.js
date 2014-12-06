
/**
 * Assign GLOBAL values to be used in tests
 */
GLOBAL.Cthulhu = require('../index');
GLOBAL.HttpFixtures = require('./fixtures/http');
var User = GLOBAL.User = require('../server/models/user');
GLOBAL.user = new User();
