'use strict';

var express = require('express');
var Emitter = require('events').EventEmitter;
var Task = require('../models/task');

function TaskController() {

  var self = this;

  self.emitter = new Emitter();

  /**
   * Retrieve current user's tasks and attach them to req.user.tasks
   * @param  {IncomingMessage} req
   * @param  {ServerResonse}   res
   * @param  {Function} next
   */
  this.getUserTasks = function(req, res, next) {
    if (req.isAuthenticated()) {
      req.user.tasks = Task.find({ user_id: req.user.id });
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
  this.index = function(req, res, next) {
    var tasks;
    if (req.query.id) {
      tasks = req.user.tasks.where({ id: { $in: req.params.id }})
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
  };

  this.create = function(req, res, next) {
    req.user.tasks
      .where({ title: req.body.title })
      .exec(function(err, tasks) {
        self.emitter.emit('create-find', err, tasks, req, res, next);
      });
  };

  this.update = function(req, res, next) {

  };

  this.destroy = function(req, res, next) {

  };

  self.emitter.on('create-find', function(err, tasks, req, res, next) {
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

  var router = express.Router();

  router.get('/', Cthulhu.securePath, this.getUserTasks, this.index);
  router.post('/', Cthulhu.securePath, this.getUserTasks, this.create);
  router.put('/', Cthulhu.securePath, this.getUserTasks, this.update);
  router.delete('/', Cthulhu.securePath, this.getUserTasks, this.destroy);

  this.router = router;
  
}

module.exports = new TaskController();
