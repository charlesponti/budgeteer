'use strict';

var cthulhu = require('cthulhu');
var mongoose = require('mongoose');
var Weight = mongoose.model('Weight');

// Create router
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
  var weight = new Weight({
    weight: req.body.weight,
    date: req.body.date,
    user: req.user._id
  });

  return weight.save(function(err, weight) {
    if (err) {
      return next(err);
    }

    return res.status(200).json({ weight: weight });
  });
});

module.exports = router;
