'use strict'

/**
 * Handler for errors
 * @param {*} err
 * @param {object} req
 * @param {object} res
 */
module.exports = function (router) {
  return router.use(function (err, req, res) {
    var message = 'There was an issue processing your request.'
    req.flash('error', err.message || message)
    return res.redirect('/')
  })
}
