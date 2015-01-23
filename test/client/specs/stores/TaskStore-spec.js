describe('TaskStore', function() {
  'use strict';

  var store, task, promise;
  var $ = require('jquery');
  var TaskStore = require('_/client/js/stores/tasks');
  var AppConstants = require('_/client/js/app').constants;

  beforeEach(function() {
    promise = new Promise(function() {});
    store = TaskStore;
    task = {
      title: 'foo',
      description: 'bar',
      completed: false,
      category: 'default'
    };
    spyOn($, 'ajax');
  });

  afterEach(function() {
    task =
    store = undefined;
  });

  describe('.dispatcherIndex()', function() {
    it('should call store.create on TASK_CREATE', function() {
      spyOn(store, 'create');
      store.dispatcherIndex({ action: AppConstants.TASK_CREATE, data: 'foo' });
      expect(store.create).toHaveBeenCalledWith('foo');
    });
    it('should call store.update on TASK_UPDATE', function() {
      spyOn(store, 'update');
      store.dispatcherIndex({ action: AppConstants.TASK_UPDATE, data: 'foo' });
      expect(store.update).toHaveBeenCalledWith('foo');
    });
    it('should call store.destroy on TASK_DESTROY', function() {
      spyOn(store, 'destroy');
      store.dispatcherIndex({ action: AppConstants.TASK_DESTROY, data: 'foo' });
      expect(store.destroy).toHaveBeenCalledWith('foo');
    });
  });

});
