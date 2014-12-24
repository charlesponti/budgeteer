'use strict';

var React = require('react');
var router = require('express').Router();
var Weight = require('mongoose').model('Weight');
var WeightMain = require('../../client/app/components/weight/main');

router.get('/', function(req, res, next) {
  return Weight
    .find({ user: req.user._id })
    .exec(function(err, weights) {
      if (err) {
        return next(err);
      }
      return res.render('layout', {
        current_user: req.user,
        view: React.renderToString(WeightMain({ weights: weights }))
      });
    });
});

module.exports = router;
