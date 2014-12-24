'use strict';

var React = require('react/addons');
var router = require('express').Router();
var Task = require('mongoose').model('Task');
var TaskView = require('../../client/app/components/task/main');

router.get('/', function(req, res, next) {
  return Task
    .find({ user_id: req.user._id })
    .populate('category')
    .exec(function(err, tasks) {
      if (err) {
        return next(err);
      }
      return res.render('layout', {
        current_user: req.user,
        view: React.renderToString(TaskView({
          initialData: tasks
        }))
      });
    });
});

module.exports = router;
