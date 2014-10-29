"use strict";

var _ = require("lodash");
var express = require('express');

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

router.get('/', router.getMe);

module.exports = router;
