'use strict';

var _ = require('lodash');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Task = require('../../models/task');

var TaskRouter = Cthulhu.Router();

TaskRouter.events = new EventEmitter();

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
TaskRouter.index = function(req, res, next) {
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
    .exec(TaskRouter.onIndexFind(req, res));
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
      return TaskRouter.events.emit('error', err, res);
    }
    Cthulhu.socket.emit('tasks', { tasks: tasks });
    res.status(200).json({ tasks: tasks });
  };
};

/**
 * Create new task
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
TaskRouter.create = function(req, res, next) {
  // Task.emit('new-task', {})
  // TaskRouter.on('task-saved', function() {})

  var task = new Task({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category || 'default',
    completed: req.body.completed || false,
    user_id: req.user.id
  });

  return task.save(TaskRouter.onSave(req, res));
};

/**
 * Update task
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
TaskRouter.update = function(req, res, next) {
  req.user.task.exec(function(err, task) {
    if (err) {
      return TaskRouter.events.emit('error', err, res);
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

/**
 * Destroy task
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
TaskRouter.destroy = function(req, res, next) {
  req.user.task.exec(function(err, task) {
    if (err) {
      return TaskRouter.events.emit('error', err, res);
    }

    if (task) {
      return task.remove(TaskRouter.onDelete(req, res));
    }

    res.status(404).json({ message: 'Task not found' });
  });
};

/**
 * Finish request after new task has been created
 * @param {object} req
 * @param {object} res
 */
TaskRouter.onSave = function(req, res) {
  /**
   * @param {?error} err
   * @param {?object} task
   */
  return function(err, task) {
    if (err) {
      return TaskRouter.events.emit('error', err, res);
    }

    return res.status(201).json({ task: task });
  };
};

/**
 * Finish request after task has been deleted
 * @param  {?error} err
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 */
TaskRouter.onDelete = function(req, res) {
  return function(err) {
    if (err) {
      return TaskRouter.events.emit('error', err, res);
    }
    res.status(200).json({ task: req.body._id });
  };
};

/**
 * Finish request after task has been updated
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 */
TaskRouter.afterUpdate = function(req, res) {
  /**
   * @param  {?error} err
   * @param  {?Task} task
   */
  return function (err, task) {
    if (err) {
      return TaskRouter.events.emit('error', err, res);
    }

    res.status(200).json({ task: task });
  };
};

TaskRouter.events.on('error', function(err, req, res) {
  req.log('error', err);
  res.status(500).json({ message: err.message });
});

TaskRouter.get('/', TaskRouter.getUserTasks, TaskRouter.index);
TaskRouter.post('/', TaskRouter.getUserTasks, TaskRouter.create);
TaskRouter.put('/', TaskRouter.getUserTask, TaskRouter.update);
TaskRouter.delete('/', TaskRouter.getUserTask, TaskRouter.destroy);

module.exports = TaskRouter;
