'use strict';

var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  user: { type: String, required: true }
});

var Category = mongoose.model('Category', CategorySchema);

/**
 * Validate category name for user
 * @param  {Function} next
 */
Category.validateName = function(next) {
  if (this.isNew || this.isModified('name')) {
    Category
      .find({ user: this.user, name: this.name })
      .exec(function(err, docs) {
        if (err) {
          return next(err);
        }

        if (docs.length) {
          return next(Error('Category with name '+this.name+' already exists'));
        }

        next();
      }.bind(this));
    return;
  }
  next();
};

CategorySchema.pre('save', Category.validateName);

module.exports = Category;
