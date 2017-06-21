var Weight = require('mongoose').model('Weight')

module.exports = function (router) {
  router.get('/', function (req, res, next) {
    Weight.find().exec(function (err, docs) {
      if (err) {
        return next(err)
      }

      return res.json(docs)
    })
  })

  router.post('/', function (req, res, next) {
    var weight = new Weight(req.body)
    var date = weight.get('date')

    Weight.findOne({ date: date }).exec(function (err, doc) {
      if (err) {
        return next(err)
      }

      if (!doc) {
        return weight.save(function (err, doc) {
          if (err) {
            return next(err)
          }

          return res.json(doc)
        })
      } else {
        return res
          .status(409)
          .json({ message: 'record already exists', item: doc })
      }
    })
  })

  router.delete('/', function (req, res, next) {
    Weight.remove({ _id: req.query._id }, function (err) {
      if (err) {
        return next(err)
      }

      return res.json({ message: 'item deleted' })
    })
  })
}
