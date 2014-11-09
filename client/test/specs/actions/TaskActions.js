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

  describe('.updateTask()', function() {
    it('should dispatch correct event', function() {
      TaskActions.updateTask('foo');
      expect(AppDispatcher.dispatch.called).to.equal(true);
    });
  });

});
