'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose');

/**
 * Task Schema
 * @type {mongoose.Schema}
 */
var TaskSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String, unique: true, required: true },
  completed: { type: Boolean, required: true },
  category: { type: String, required: true },
  user_id: { type: String, required: true },
  created_at: String,
  updated_at: String
});

/**
 * Perform actions before Task instance is saved
 */
TaskSchema.pre('save', function(next) {
  var date = new Date();
  if (this.isNew) {
    /**
     * Update `created_at` attribute
     * @type {String}
     */
    this.created_at = date.toString();
    if (!this.category) {
      this.category = 'default';
    }
  }
  /**
   * Update `updated_at` attribute
   * @type {String}
   */
  this.updated_at = date.toString();
  next();
});

module.exports = mongoose.model('Task', TaskSchema);
