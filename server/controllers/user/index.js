const User = require('mongoose').model('User')

module.exports = router =>
  router.post('/', (req, res, next) => {
    const accessToken = req.body.accessToken
    const id = req.body.userID
    const query = { id, accessToken }

    User.findOne(query, (err, user) => {
      if (err) {
        return next(err)
      } else if (user) {
        return res.json({ user })
      } else if (id) {
        return new User(query).save((err, user) => {
          if (err) {
            return next(err)
          }

          return res.json({ user })
        })
      } else {
        return res.status(500).json({
          error: 'Please supply Facebook User ID'
        })
      }
    })
  })
