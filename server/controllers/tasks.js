'use strict';

var express = require('express');
var events = require('events');
var Task = require('../models/task');
var merge = require('react/lib/merge');

var TaskController = merge(events.EventEmitter.prototype, {

  /**
   * Retrieve current user's tasks and attach them to req.user.tasks
   * @param  {IncomingMessage} req
   * @param  {ServerResonse}   res
   * @param  {Function} next
   */
  getUserTasks: function(req, res, next) {
    if (req.isAuthenticated()) {
      req.user.tasks = Task.find({ user_id: req.user.id });
    }
    next();
  },

  /**
   * Retrieve either all user's tasks or a specific set of tasks if tasks query
   * is passed.
   * @param  {IncomingMessage}   req
   * @param  {ServerResponse}   res
   * @param  {Function} next
   */
  index: function(req, res, next) {
    var tasks;
    if (req.query.id) {
      tasks = req.user.tasks.where({ id: { $in: req.params.id }});
    } else {
      tasks = req.user.tasks;
    }
    tasks.exec(function(err, tasks) {
      if (err) {
        return res.status(500).json({
          message: 'There was an issue fetching your tasks'
        });
      }
      res.status(200).json({ tasks: tasks });
    });
  },

  create: function(req, res, next) {
    req.user.tasks
      .where({ title: req.body.title })
      .exec(function(err, tasks) {
        TaskController.emit('create-find', err, tasks, req, res, next);
      });
  },

  update: function(req, res, next) {

  },

  destroy: function(req, res, next) {
    req.user.tasks
      .where({ _id: req.body.id })
      .exec(function(err, tasks) {
        if (err) {
          return console.log(err);
        }
        if (tasks.length) {
          return tasks[0].remove(function(err, task) {
            TaskController.emit('after-delete', err, req, res, next);
          });
        }
        res.status(404).json({ message: 'Task not found' });
      });
  }
});

TaskController.on('create-find', function(err, tasks, req, res, next) {
  if (err) {
    return res.status(500).json({
      message: 'There was an issue creating your tasks'
    });
  }
  var task = new Task();
  task.title = req.body.title;
  task.description = req.body.description;
  task.user_id = req.user.id;
  task.save(function(err, task) {
    if (err) {
      return res.status(500).json({
        message: 'There was an issue creating your task',
        raw: err
      });
    }
    res.status(201).json({ task: task });
  });
});

/**
 * Finish request after task has been deleted
 * @param  {error|null} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {function} next
 */
TaskController.on('after-delete', function(err, req, res, next) {
  if (err) {
    console.log(err);
  }
  res.status(200).json({ message: 'Task Deleted', task: req.body.id });
});

var router = express.Router();

router.get('/', Cthulhu.securePath, TaskController.getUserTasks, TaskController.index);
router.post('/', Cthulhu.securePath, TaskController.getUserTasks, TaskController.create);
router.put('/', Cthulhu.securePath, TaskController.getUserTasks, TaskController.update);
router.delete('/', Cthulhu.securePath, TaskController.getUserTasks, TaskController.destroy);

TaskController.router = router;

module.exports = TaskController;
