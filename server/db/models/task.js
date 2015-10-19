'use strict';

var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
  detail: String,
  date: Date,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  // Friends can leave comments on each other's tasks
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

var TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;
