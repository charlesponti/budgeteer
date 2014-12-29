'use strict';

var React = require('react/addons');
var router = require('express').Router();
var Task = require('mongoose').model('Task');
var Category = require('mongoose').model('Category');
var TaskView = require('../../client/app/components/task/main');

router.get('/', function(req, res, next) {
  return Task
    .find({ user_id: req.user._id })
    .populate('category')
    .exec(function(err, tasks) {
      if (err) {
        return next(err);
      }

      return Category
        .find({ user: req.user._id })
        .exec(function(err, categories) {
          if (err) {
            return next(err);
          }

          return res.render('layout', {
            current_user: req.user,
            view: React.renderToString(TaskView({
              tasks: tasks,
              categories: categories
            }))
          });
        });
    });
});

module.exports = router;
