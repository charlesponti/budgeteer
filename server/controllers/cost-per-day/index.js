var CostPerDay = require('mongoose').model('CostPerDay')

module.exports = function (router) {
  router.get('/', function (req, res, next) {
    CostPerDay.find().exec(function (err, items) {
      if (err) {
        return next(err)
      }

      return res.json({ items: items })
    })
  })

  router.post('/', function (req, res, next) {
    var weight = new CostPerDay(req.body)
    var id = weight.get('id')

    CostPerDay.findOne({ id: id }).exec(function (err, doc) {
      if (err) {
        return next(err)
      }

      if (!doc) {
        return weight.save(function (err, weight) {
          if (err) {
            return next(err)
          }

          return res.json({ weight: weight })
        })
      } else {
        return res
          .status(409)
          .json({ message: 'weight already exists', weight: doc })
      }
    })
  })

  router.delete('/', function (req, res, next) {
    CostPerDay.remove({ _id: req.query._id }, function (err) {
      if (err) {
        return next(err)
      }

      return res.json({ message: 'item deleted' })
    })
  })
}
