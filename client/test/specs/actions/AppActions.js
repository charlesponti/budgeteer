describe('Actions: AppActions', function() {
  'use strict';

  var sandbox, AppActions, AppDispatcher;
  var expect = window.chai.expect;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    AppActions = require('../../../app/actions/App');
    AppDispatcher = require('../../../app/dispatchers/App');
    sandbox.stub(AppDispatcher, 'dispatch');
  });

  afterEach(function() {
    AppActions = undefined;
    sandbox.restore();
  });

  describe('.createTask()', function() {
    it('should dispatch correct event', function() {
      AppActions.createTask('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
      expect(AppDispatcher.dispatch.getCall(0).args[0]).to.deep.equal({
        action: 'TASK_CREATE',
        data: 'foo'
      });
    });
  });

  describe('.updateTask()', function() {
    it('should dispatch correct event', function() {
      AppActions.updateTask('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
      expect(AppDispatcher.dispatch.getCall(0).args[0]).to.deep.equal({
        action: 'TASK_UPDATE',
        data: 'foo'
      });
    });
  });

  describe('.deleteTask()', function() {
    it('should dispatch correct event', function() {
      AppActions.deleteTask('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
      expect(AppDispatcher.dispatch.getCall(0).args[0]).to.deep.equal({
        action: 'TASK_DESTROY',
        data: 'foo'
      });
    });
  });

  describe('.createCategory()', function() {
    it('should dispatch correct event', function() {
      AppActions.createCategory('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
      expect(AppDispatcher.dispatch.getCall(0).args[0]).to.deep.equal({
        action: 'CATEGORY_CREATE',
        data: 'foo'
      });
    });
  });

  describe('.updateCategory()', function() {
    it('should dispatch correct event', function() {
      AppActions.updateCategory('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
      expect(AppDispatcher.dispatch.getCall(0).args[0]).to.deep.equal({
        action: 'CATEGORY_UPDATE',
        data: 'foo'
      });
    });
  });

  describe('.deleteCategory()', function() {
    it('should dispatch correct event', function() {
      AppActions.deleteCategory('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
      expect(AppDispatcher.dispatch.getCall(0).args[0]).to.deep.equal({
        action: 'CATEGORY_DESTROY',
        data: 'foo'
      });
    });
  });

});
