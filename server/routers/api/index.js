"use strict";

var _ = require('lodash');
var express = require('express');

var WeightRouter = require('./weight');
var TaskRouter = require('./TaskRouter');
var CategoryRouter = require('./CategoryRouter');

var router = express.Router();

/**
 * Return user in json format
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 */
router.getMe = function(req, res) {
  if (req.isAuthenticated()) {
    var user = _.omit(req.user.toJSON(), "hashed_password", "salt");
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "No user signed in." });
  }
};

router.get('/me', router.getMe);
router.use('/tasks', TaskRouter);
router.use('/categories', CategoryRouter);
router.use('/weight', WeightRouter);

module.exports = router;
