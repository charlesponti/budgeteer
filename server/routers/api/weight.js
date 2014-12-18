'use strict';

var express = require('express');
var mongoose = require('mongoose');
var Weight = mongoose.model('Weight');

// Create router
var router = express.Router();

router.get('/', function(req, res, next) {
  return Weight
    .find({ user: req.user._id })
    .sort('-date')
    .exec(function(err, weights) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ data: weights });
  });
});

router.post('/', function(req, res, next) {
  var weight = new Weight({
    kilograms: req.body.weight,
    date: req.body.date,
    user: req.user._id
  });

  console.log(weight);
  
  return weight.save(function(err, weight) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ weight: weight });
  });
});

module.exports = router;
