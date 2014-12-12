describe('Actions: AppActions', function() {
  'use strict';

  var AppActions = require('../../../app/actions/App');
  var AppDispatcher = require('../../../app/dispatchers/App');

  beforeEach(function() {
    spyOn(AppDispatcher, 'dispatch');
  });

  describe('.loadModal()', function() {
    it('should dispatch SHOW_MODAL event with data', function() {
      AppActions.loadModal({ foo: 'foo' });
      expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
        action: 'SHOW_MODAL',
        data: { foo: 'foo' }
      });
    });
  });

  describe('.closeModal()', function() {
    it('should dispatch CLOSE_MODAL event with data', function() {
      AppActions.closeModal();
      expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
        action: 'CLOSE_MODAL'
      });
    });
  });

  describe('.createTask()', function() {
    it('should dispatch correct event', function() {
      AppActions.createTask('foo');
      expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
        action: 'TASK_CREATE',
        data: 'foo'
      });
    });
  });

  describe('.updateTask()', function() {
    it('should dispatch correct event', function() {
      AppActions.updateTask('foo');
      expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
        action: 'TASK_UPDATE',
        data: 'foo'
      });
    });
  });

  describe('.deleteTask()', function() {
    it('should dispatch correct event', function() {
      AppActions.deleteTask('foo');
      expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
        action: 'TASK_DESTROY',
        data: 'foo'
      });
    });
  });

  describe('.createCategory()', function() {
    it('should dispatch correct event', function() {
      AppActions.createCategory('foo');
      expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
        action: 'CATEGORY_CREATE',
        data: 'foo'
      });
    });
  });

  describe('.updateCategory()', function() {
    it('should dispatch correct event', function() {
      AppActions.updateCategory('foo');
      expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
        action: 'CATEGORY_UPDATE',
        data: 'foo'
      });
    });
  });

  describe('.deleteCategory()', function() {
    it('should dispatch correct event', function() {
      AppActions.deleteCategory('foo');
      expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
        action: 'CATEGORY_DESTROY',
        data: 'foo'
      });
    });
  });

});
