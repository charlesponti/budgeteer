'use strict'

var WeightStore = require('mongoose').model('Weight')

module.exports = function (router) {
  router.get('/', function (req, res, next) {
    WeightStore.find().exec(function (err, weights) {
      if (err) {
        return next(err)
      }

      return res.json({weights: weights})
    })
  })

  router.post('/', function (req, res, next) {
    var weight = new WeightStore(req.body)
    var date = weight.get('date')

    WeightStore.findOne({date: date}).exec(function (err, doc) {
      if (err) {
        return next(err)
      }

      if (!doc) {
        return weight.save(function (err, weight) {
          if (err) {
            return next(err)
          }

          return res.json({weight: weight})
        })
      } else {
        return res.status(409).json({message: 'weight already exists', weight: doc})
      }
    })
  })

  router.delete('/', function (req, res, next) {
    WeightStore.remove({ _id: req.query.id }, function (err) {
      if (err) {
        return next(err)
      }

      return res.json({message: 'item deleted'})
    })
  })
}
