'use strict';

var _ = require('lodash');
var AppActions = require('../actions/app');
var AppConstants = require('../constants/app');
var AppDispatcher = require('../dispatchers/app');
var Backbone = require('backbone');

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: ./BaseStore
 * @requires module: ../constants/appConstants
 */
var CategoryStore = Backbone.Collection.extend({

  url: '/api/categories',

  parse: function(response) {
    return response.data;
  }

});

CategoryStore = new CategoryStore();

/**
 * Handle events dispatched and received
 * @param  {object} payload
 * @return {boolean}
 */
CategoryStore.dispatcherIndex = function(payload) {

  switch (payload.action) {
    case AppConstants.CATEGORY_CREATE:
      CategoryStore.create(payload.data);
      break;
    case AppConstants.CATEGORY_UPDATE:
      CategoryStore.update(payload.data);
      break;
    case AppConstants.CATEGORY_DESTROY:
      CategoryStore.destroy(payload.data);
      break;
  }

  return true;
};

/**
 * Register event handler
 */
CategoryStore.dispatchToken = AppDispatcher.register(CategoryStore.dispatcherIndex);

module.exports = CategoryStore;
