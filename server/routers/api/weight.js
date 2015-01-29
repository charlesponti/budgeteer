'use strict';

var cthulhu = require('cthulhu');
var mongoose = require('mongoose');
var Weight = mongoose.model('Weight');

// Create router
var router = cthulhu.Router();

router.get('/', function(req, res, next) {
  return Weight
    .find({ user: req.user._id })
    .sort({ date: 'asc' })
    .exec(function(err, weights) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ data: weights });
  });
});

router.post('/', function(req, res, next) {
  var weight = new Weight({
    kgs: req.body.kgs,
    lbs: req.body.lbs,
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
