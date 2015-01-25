'use strict';

var _ = require('lodash');
var util = require('util');
var express = require('express');
var mongoose = require('mongoose');
var EventEmitter = require('events').EventEmitter;
var Task = mongoose.model('Task');

// Create router
var router = express.Router();

router.events = new EventEmitter();

/**
 * Retrieve current user's tasks and attach them to req.user.tasks
 * @param  {IncomingMessage} req
 * @param  {ServerResonse}   res
 * @param  {Function} next
 */
router.getUserTasks = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.user.tasks = Task.find({ user_id: req.user._id });
  }
  next();
};

/**
 * Retrieve specific task of current user's and attach it to req.user.task
 * @param  {IncomingMessage} req
 * @param  {ServerResonse}   res
 * @param  {Function} next
 */
router.getUserTask = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.user.task = Task.findOne({ user_id: req.user.id, _id: req.body._id });
  }
  next();
};

/**
 * Retrieve either all user's tasks or a specific set of tasks if tasks query
 * is passed.
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
router.index = function(req, res, next) {
  var tasks;

  // If `id` is passed in request query, search for a task with this id.
  // Otherwise, return all tasks.
  if (req.query.id) {
    tasks = req.user.tasks.where({ id: { $in: req.params.id }});
  } else {
    tasks = req.user.tasks;
  }

  Task
    .find()
    .populate('category')
    .exec(router.onIndexFind.bind(router, req, res, next));
};

/**
 * Send Tasks
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 * @param  {Function} next
 * @param  {?error} err
 * @param  {?array} tasks
 * @return {Function}
 */
router.onIndexFind = function(req, res, next, err, tasks) {
  if (err) {
    return next(err);
  }
  res.status(200).json({ data: tasks });
};

/**
 * Create new task
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
router.create = function(req, res, next) {
  var task = new Task({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category || 'default',
    completed: req.body.completed || false,
    user_id: req.user.id
  });

  return task.save(router.onSave.bind(router, req, res, next));
};

/**
 * Update task
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
router.update = function(req, res, next) {
  req.user.task.exec(function(err, task) {
    if (err) {
      return router.events.emit('error', err, res);
    }

    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.completed = req.body.completed;
      task.category = req.body.category._id;
      return task.save(router.afterUpdate.bind(router, req, res, next));
    }

    return res.status(404).json({ message: 'Task not found' });
  });
};

/**
 * Destroy task
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
router.destroy = function(req, res, next) {
  req.user.task.exec(function(err, task) {
    if (err) {
      return router.events.emit('error', err, res);
    }

    if (task) {
      return task.remove(router.onDelete.bind(router, req, res, next));
    }

    res.status(404).json({ message: 'Task not found' });
  });
};

/**
 * Finish request after new task has been created
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {?Error} err
 * @param {?Task} task
 */
router.onSave = function(req, res, next, err, task) {
  if (err) {
    return next(err);
  }

  return res.status(201).json({ data: task });
};

/**
 * Finish request after task has been deleted
 * @param  {Function} next
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 * @param  {?error} err
 */
router.onDelete = function(req, res, next, err) {
  if (err) {
    return router.events.emit('error', err, res);
  }

  res.status(200).json({ data: req.body._id });
};

/**
 * Finish request after task has been updated
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 * @param  {?error} err
 * @param  {?Task} task
 */
router.afterUpdate = function(req, res, next, err, task) {
  if (err) {
    return next(err);
  }

  return res.status(200).json({ data: task });
};

router.get('/', router.getUserTasks, router.index);
router.post('/', router.getUserTasks, router.create);
router.put('/', router.getUserTask, router.update);
router.delete('/', router.getUserTask, router.destroy);

module.exports = router;
