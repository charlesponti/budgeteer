
/**
 * Assign GLOBAL values to be used in tests
 */
GLOBAL.sinon = require('sinon');
GLOBAL.expect = require('chai').expect;
GLOBAL.Cthulhu = require('../index')();
GLOBAL.HttpFixtures = require('./fixtures/http');
var User = GLOBAL.User = require('../models/user');
GLOBAL.user = new User();

