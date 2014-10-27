'use strict';

var _ = require('lodash');
var express = require('express');
var Task = require('../models/task');

var TaskRouter = express.Router();

/**
 * Retrieve current user's tasks and attach them to req.user.tasks
 * @param  {IncomingMessage} req
 * @param  {ServerResonse}   res
 * @param  {Function} next
 */
TaskRouter.getUserTasks = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.user.tasks = Task.find({ user_id: req.user.id });
  }
  next();
};

/**
 * Retrieve specific task of current user's and attach it to req.user.task
 * @param  {IncomingMessage} req
 * @param  {ServerResonse}   res
 * @param  {Function} next
 */
TaskRouter.getUserTask = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.user.task = Task.find({ user_id: req.user.id, _id: req.body._id });
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
TaskRouter.index = function(req, res, next) {
  var tasks;
  
  // If `id` is passed in request query, search for a task with this id.
  // Otherwise, return all tasks.
  if (req.query.id) {
    tasks = req.user.tasks.where({ id: { $in: req.params.id }});
  } else {
    tasks = req.user.tasks;
  }

  tasks.exec(TaskRouter.onIndexFind(req, res));
};

/**
 * Send Tasks
 * @param  {IncomingMessage} req 
 * @param  {ServerResponse} res
 * @return {Function}
 */
TaskRouter.onIndexFind = function(req, res) {
  /**
   * @param  {?error} err
   * @param  {?array} tasks
   */
  return function(err, tasks) {
    if (err) {
      return res.status(500).json({
        message: 'There was an issue fetching your tasks'
      });
    }
    Cthulhu.socket.emit('tasks', { tasks: tasks });
    res.status(200).json({ tasks: tasks });
  };
};

TaskRouter.update = function(req, res, next) {
  req.user.task.exec(function(err, task) {
    if (err) {
      return console.log(err);
    }
    
    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.completed = req.body.completed || task.completed;
      task.category = req.body.category || 'default';
      return task.save(TaskRouter.afterUpdate(req, res));
    }

    res.status(404).json({ message: 'Task not found' });
  });
};

TaskRouter.destroy = function(req, res) {
  req.user.task.exec(function(err, tasks) {
    if (err) {
      return console.log(err);
    }
    
    if (tasks.length) {
      return tasks[0].remove(TaskRouter.onDelete(req, res));
    }
    
    res.status(404).json({ message: 'Task not found' });
  });
};

/**
 * Create new task
 * @param  {Request}   req 
 * @param  {Response}   res
 * @param  {Function} next
 */
TaskRouter.create = function(req, res, next) {
  req.user.tasks
    .where({ title: req.body.title })
    .exec(TaskRouter.createTask(req, res));
};

/**
 * After checking for existing tasks with supplied title, create new 
 * task and attempt to save it.
 * @param  {IncomingMessage} req
 * @param  {ServerResponse}  res
 * @param  {?error} err
 * @param  {?array} tasks
 */
TaskRouter.createTask = function(req, res, err, tasks) {
  return function(err, tasks) {

    if (err) {
      req.log('error', err);
      return res.status(500).json({
        message: 'There was an issue creating your tasks'
      });
    }

    if (!tasks.length) {
      var task = new Task({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category || 'default',
        completed: req.body.completed || false,
        user_id: req.user.id
      });
      return task.save(TaskRouter.onSave(req, res));
    }

    res.status(409).json({ 
      message: 'There is already a task with this title' 
    });
  };
};

/**
 * Finish request after new task has been created
 * @param {object} req
 * @param {object} res
 * @param {?error} err
 * @param {?object} task
 */
TaskRouter.onSave = function(req, res) {
  return function(err, task) {
    if (err) {
      req.log('error', err);
      return res.status(500).json({
        message: 'Server error',
        info: err.message
      });
    }
    return res.status(201).json({ task: task });
  };
};

/**
 * Finish request after task has been deleted
 * @param  {?error} err
 * @param  {Request} req
 * @param  {Response} res
 */
TaskRouter.onDelete = function(req, res) {
  return function(err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ task: req.body._id });
  };
};

/**
 * Finish request after task has been updated
 * @param  {?error} err
 * @param  {Task} task
 * @param  {Request} req
 * @param  {Response} res
 */
TaskRouter.afterUpdate = function(err, task, req, res) {
  if (err) {
    console.log(err);
  }
  res.status(200).json({ task: task });
};

TaskRouter.get('/', Cthulhu.securePath, TaskRouter.getUserTasks, TaskRouter.index);
TaskRouter.post('/', Cthulhu.securePath, TaskRouter.getUserTasks, TaskRouter.create);
TaskRouter.put('/', Cthulhu.securePath, TaskRouter.getUserTask, TaskRouter.update);
TaskRouter.delete('/', Cthulhu.securePath, TaskRouter.getUserTask, TaskRouter.destroy);

module.exports = TaskRouter;
