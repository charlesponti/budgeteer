'use strict';

var React = require('react');
var router = require('express').Router();
var Weight = require('mongoose').model('Weight');
var WeightMain = require('_/common/components/weight/main');

router.get('/', function(req, res, next) {
  return Weight
    .find({ user: req.user._id })
    .exec(function(err, weights) {
      if (err) {
        return next(err);
      }

      return res.render('layout', {
        initialData: JSON.stringify({ weights: weights }),
        current_user: req.user,
        view: React.renderToString(WeightMain({ initialData: weights }))
      });
    });
});

module.exports = router;
