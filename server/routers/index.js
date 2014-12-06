'use strict';

/**
 * Routers
 */
var ApiRouter = require('./api');
var AppRouter = require('./AppRouter');
var AuthRouter = require('./AuthRouter');
var UserRouter = require('./UserRouter');

/**
 * Create new express router
 * @type {express.Router}
 */
var router = Cthulhu.Router();

// Log Out
router.post('/login', UserRouter.logIn);
router.get('/login', UserRouter.serve.login);
router.get('/logout', UserRouter.logOut);

// Authentication
router.use('/auth', AuthRouter);

// API
router.use('/api', ApiRouter);

// App Routes
router.use('/', AppRouter);

module.exports = router;
