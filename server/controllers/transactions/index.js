'use strict'

var Transaction = require('mongoose').model('Transaction')

module.exports = function (router) {
  router.get('/', function (req, res, next) {
    Transaction.find().exec(function (err, docs) {
      if (err) {
        return next(err)
      }

      return res.json(docs)
    })
  })

  router.post('/', function (req, res, next) {
    var record = new Transaction(req.body)

    return record.save(function (err, doc) {
      if (err) {
        return next(err)
      }

      return res.json(doc)
    })
  })

  router.delete('/', function (req, res, next) {
    Transaction.remove({ _id: req.query.id }, function (err) {
      if (err) {
        return next(err)
      }

      return res.json({message: 'item deleted'})
    })
  })
}
