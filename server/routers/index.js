'use strict';

var express = require('express');

/**
 * Routers
 */
var AppRouter = require('./AppRouter');
var AuthRouter = require('./AuthRouter');
var ApiRouter = require('./ApiRouter');
var UserRouter = require('./UserRouter');
var TaskRouter = require('./TaskRouter');

/**
 * Create new express router
 * @type {express.Router}
 */
var router = express.Router();

// Log Out
router.post('/login', UserRouter.logIn);
router.get('/login', UserRouter.serve.login);
router.get('/logout', UserRouter.logOut);

// Authentication
router.use('/auth', AuthRouter);

// API
router.get('/api/me', ApiRouter.me);
router.use('/api/tasks', TaskRouter);

// App Routes
router.use('/', AppRouter);

router.get('*', function(req, res, next) {
  res.render('index');
});

module.exports =  router;
