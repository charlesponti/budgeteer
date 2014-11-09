describe('Actions: TaskActions', function() {
  'use strict';

  var sandbox, TaskActions, AppDispatcher;
  var expect = window.chai.expect;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    TaskActions = require('../../../app/actions/TaskActions');
    AppDispatcher = require('../../../app/dispatchers/App');
    sandbox.stub(AppDispatcher, 'dispatch');
  });

  afterEach(function() {
    TaskActions = undefined;
    sandbox.restore();
  });

  describe('.createTask()', function() {
    it('should dispatch correct event', function() {
      TaskActions.createTask('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
      expect(AppDispatcher.dispatch.getCall(0).args[0]).to.deep.equal({
        action: 'TASK_CREATE',
        data: 'foo'
      });
    });
  });

  describe('.updateTask()', function() {
    it('should dispatch correct event', function() {
      TaskActions.updateTask('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
      expect(AppDispatcher.dispatch.getCall(0).args[0]).to.deep.equal({
        action: 'TASK_UPDATE',
        data: 'foo'
      });
    });
  });

  describe('.deleteTask()', function() {
    it('should dispatch correct event', function() {
      TaskActions.deleteTask('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
      expect(AppDispatcher.dispatch.getCall(0).args[0]).to.deep.equal({
        action: 'TASK_DESTROY',
        data: 'foo'
      });
    });
  });

});
