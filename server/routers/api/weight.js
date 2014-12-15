'use strict';

var cthulhu = require('cthulhu');
var mongoose = require('mongoose');

var Weight = mongoose.model('Weight');

var router = cthulhu.Router();

router.get('/', function(req, res, next) {
  Weight
    .find({ user: req.user._id })
    .exec(function(err, weights) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ data: weights });
  });
});

router.post('/', function(req, res, next) {
  
});

module.exports = router;
