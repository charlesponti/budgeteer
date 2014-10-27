'use strict';

var express = require('express');

/**
 * Routers
 */
var AppRouter = require('./app');
var AuthRouter = require('./auth');
var ApiRouter = require('./api');
var UserRouter = require('./user');
var TasksRouter = require('./tasks');

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
router.get('/api/me', ApiRouter.getMe);
router.use('/api/tasks', TasksRouter);

// App Routes
router.use('/', AppRouter);

router.get('*', function(req, res, next) {
  res.render('index');
});

module.exports =  router;
