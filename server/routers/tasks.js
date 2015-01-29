'use strict';

var React = require('react/addons');
var router = require('cthulhu').Router();
var Task = require('mongoose').model('Task');
var Category = require('mongoose').model('Category');
var TaskView = require('../../components/task/main');

router.get('/', function(req, res, next) {
  return Task
    .find({user_id: req.user._id})
    .populate('category')
    .exec(function(err, tasks) {
      if (err) {
        return next(err);
      }

      return Category
        .find({user: req.user._id})
        .exec(function(err, categories) {
          if (err) {
            return next(err);
          }

          var data = {
            tasks: tasks,
            categories: categories
          };

          return res.render('layout', {
            current_user: req.user,
            initialData: JSON.stringify(data),
            view: React.renderToString(TaskView({ initialData: data }))
          });
        });
    });
});

module.exports = router;
