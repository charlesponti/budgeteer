'use strict';

var $ = require('jquery');
var CategoryStore = require('./stores/categories.js');
var TaskStore = require('./stores/tasks');
var WeightStore = require('./stores/weight');

function getInitialData() {
  var node = $('#initial-data');

  // Parse initial data
  var initialData = node.html() && JSON.parse(node.html());

  // Empty #initial-data
  node.html('');

  // Return initial data
  return initialData;
}

var initialData = getInitialData();

TaskStore.add(initialData.tasks);
CategoryStore.add(initialData.categories);
WeightStore.add(initialData.weights);

module.exports = {
  getInitialData: getInitialData,
  tasks: TaskStore.models,
  categories: CategoryStore.models,
  weights: WeightStore.models
};
