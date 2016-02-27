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

  router.put('/', function (req, res, next) {
    Transaction.findOne({ _id: req.body._id }).exec(function (err, doc) {
      if (err) {
        return next(err)
      }

      if (typeof doc === 'undefined') {
        return res.status(400).json({ message: 'record '+req.query._id+' does not exist'})
      }

      if (doc) {
        doc.update(req.body, function (err, doc) {
          if (err) {
            return next(err)
          }

          return res.status(200).json({ message: 'record updated', doc: doc })
        })
      }
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
    Transaction.remove({ _id: req.query._id }, function (err) {
      if (err) {
        return next(err)
      }

      return res.json({message: 'item deleted'})
    })
  })
}
