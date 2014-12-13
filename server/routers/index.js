'use strict';

// Routers
var cthulhu = require('cthulhu');
var ApiRouter = require('./api');
var AppRouter = require('./AppRouter');
var AuthRouter = require('./AuthRouter');
var UserRouter = require('./UserRouter');

/**
 * Create router
 * @type {express.Router}
 */
var router = cthulhu.Router();

// Log Out
router.get('/logout', UserRouter.logOut);

// Authentication
router.use('/auth', AuthRouter);

// API
router.use('/api', ApiRouter);

// App Routes
router.use('/', AppRouter);

module.exports = router;
