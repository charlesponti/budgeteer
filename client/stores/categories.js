'use strict';

var _ = require('lodash');
var App = require('../app');
var AppActions = App.actions;
var AppConstants = App.constants;
var AppDispatcher = App.dispatcher;
var Backbone = require('backbone');

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: backbone
 * @requires module: ../app-actions
 * @requires module: ../app-constants
 * @requires module: ../app-dispatcher
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
