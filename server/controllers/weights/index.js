'use strict';

var util = require('util');
var Weight = require('mongoose').model('Weight');

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    Weight.find().exec(function(err, weights) {
      if (err) {
        return next(err);
      }

      return res.json({weights: weights});
    })
  });

  router.post('/', function(req, res, next) {
    var weight = new Weight(req.body);
    var date = weight.get('date');

    Weight.findOne({date: date}).exec(function(err, doc) {
      if (err) {
        return next(err);
      }

      if (!doc) {
        return weight.save(function(err, weight) {
          if (err) {
            return next(err);
          }

          return res.json({weight: weight});
        });
      }
      else {
        return res.status(409).json({message: 'weight already exists', weight: doc});
      }
    });
  });
};
