'use strict';

var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String, unique: true, required: true },
  user_id: { type: String, required: true },
  created_at: String,
  updated_at: String
});

TaskSchema.pre('save', function(next) {
  var date = new Date();
  if (this.isNew) {
    /**
     * Update `created_at` attribute
     * @type {String}
     */
    this.created_at = date.toString();
  }
  /**
   * Update `updated_at` attribute
   * @type {String}
   */
  this.updated_at = date.toString();
  next();
});

module.exports = mongoose.model('Task', TaskSchema);
