'use strict';

// Routers
var express = require('express');
var ApiRouter = require('./api');
var AppRouter = require('./AppRouter');
var AuthRouter = require('./AuthRouter');
var UserRouter = require('./UserRouter');

/**
 * Create router
 * @type {express.Router}
 */
var router = express.Router();

// Log Out
router.get('/logout', UserRouter.logOut);

// Authentication
router.use('/auth', AuthRouter);

// API
router.use('/api', ApiRouter);

router.use('/tasks', require('./tasks'));

// App Routes
router.use('/', AppRouter);

router.use(function(err, req, res, next) {
  if (req.xhr) {
    return res.status(500).json({ error: err });
  }
  return res.render('500', { error: err });
});

module.exports = router;
