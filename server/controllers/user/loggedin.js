'use strict'

module.exports = function (router) {
  router.get('/', function (req, res) {
    if (req.user) {
      return res.json(req.user)
    } else {
      response.status(401) // Authorization required
      response.json({error: 'Authorization required!', code: 401})
    }
  })
}
