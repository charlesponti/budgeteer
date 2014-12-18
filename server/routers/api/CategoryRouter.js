'use strict';

var _ = require('lodash');
var express = require('express');
var mongoose = require('mongoose');

// Retrieve Category model
var Category = mongoose.model('Category');

// Create router
var router = express.Router();

/**
 * Get Categories belonging to user
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
router.readCategories = function(req, res, next) {
  Category
    .find({ user: req.user._id })
    .exec(function(err, categories) {
      if (err) {
        throw err;
      }
      res.status(200).json({ categories: categories });
    });
};

/**
 * Create new category
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
router.createCategory = function(req, res, next) {
  var category = new Category({
    name: req.body.name,
    color: req.body.color,
    user: req.user._id
  });

  category.save(function(err, category) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: 'Category created.', category: category });
  });
};

/**
 * Update category
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
router.updateCategory = function(req, res, next) {
  Category
    .findOne({ user: req.user._id, name: req.query.name })
    .exec(function(err, category) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (category) {
        category.name = req.body.name || category.name;
        category.color = req.body.color || category.color;
        category.save(function(err, category) {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          return res.status(200).json({
            message: 'Category updated.',
            category: category
          });
        });
        return;
      }

      res.status(404).json({ message: 'Category could not be found.' });
    });
};

/**
 * Destroy category
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
router.destroyCategory = function(req, res, next) {
  Category
    .findOne({ user: req.user._id, name: req.query.name })
    .exec(function(err, category) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      category.remove(function(err) {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        res.status(200).json({
          message: 'Category '+category.name+' has been deleted'
        });
      });
    });
};

router.get('/', router.readCategories);
router.post('/', router.createCategory);
router.put('/', router.updateCategory);
router.delete('/', router.destroyCategory);

// Export router
module.exports = router;
