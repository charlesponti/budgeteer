'use strict';

var base = '../../../app/';
var service = require(base+'service/api');
var TaskStore = require(base+'stores/TaskStore');
var AppConstants = require(base+'constants/App');

describe('TaskStore', function() {

  var store, task, promise;

  beforeEach(function() {
    store = TaskStore;
    promise = new Promise(function() {});
    task = {
      title: 'foo',
      description: 'bar',
      completed: false,
      category: 'default'
    };
    promise.resolve = Promise.resolve.bind(promise, {
      tasks: [
        { _id: 1, title: 'foo' }
      ]
    });
    promise.reject = Promise.reject.bind(promise, { message: 'Error' });
    spyOn(promise, 'then').andReturn(promise);
    spyOn(promise, 'catch');
  });

  afterEach(function() {
    task = undefined;
    store = undefined;
    promise = undefined;
  });

  describe('.load()', function() {
    it('should call service.get', function() {
      spyOn(service, 'get').andReturn(promise);
      store.load();
      expect(service.get).toHaveBeenCalledWith('tasks');
      expect(promise.then).toHaveBeenCalled();
    });
  });

  describe('.create()', function() {
    it('should call service.post', function() {
      spyOn(service, 'post').andReturn(promise);
      store.create(task);
      expect(service.post).toHaveBeenCalledWith('tasks', task);
      expect(promise.then).toHaveBeenCalled();
    });
  });

  describe('.udpate()', function() {
    it('should call service.put', function() {
      spyOn(service, 'put').andReturn(promise);
      store.update(task);
      expect(service.put).toHaveBeenCalledWith('tasks', task);
      expect(promise.then).toHaveBeenCalled();
    });
  });

  describe('.destroy()', function() {
    it('should call service.del', function() {
      spyOn(service, 'del').andReturn(promise);
      store.destroy(task);
      expect(service.del).toHaveBeenCalledWith('tasks', task);
      expect(promise.then).toHaveBeenCalled();
    });
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
