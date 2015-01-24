'use strict';

var lodash = require('lodash');
var EventEmitter = require('events').EventEmitter;

function BaseStore() {

  /**
   * Extend EventEmitter
   */
  _.extend(this, new EventEmitter());

  this.url = '/';

  this.models = [];

}

BaseStore.prototype.create = function create() {

}

BaseStore.prototype.read = function read() {

}

BaseStore.prototype.update = function update() {

}

BaseStore.prototype.delete = function delete() {

}

window.BaseStore = BaseStore;

module.exports = BaseStore;
