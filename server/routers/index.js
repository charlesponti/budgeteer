'use strict';

var router = require('express').Router();

router.use('/', require('./AppRouter'));
router.get('/user', require('./UserRouter'));
router.use('/auth', require('./AuthRouter'));
router.use('/api', require('./api'));
router.use('/tasks', require('./tasks'));
router.use('/weight', require('./weight'));

router.use(function(err, req, res, next) {
  if (req.xhr) {
    return res.status(500).json({ error: err });
  }
  return res.render('500', { error: err });
});

module.exports = router;
