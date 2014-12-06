"use strict";

var _ = require("lodash");

var TaskRouter = require('./TaskRouter');
var CategoryRouter = require('./CategoryRouter');

var cthulhu = require('cthulhu');
var router = cthulhu.Router();

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

module.exports = router;
