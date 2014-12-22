describe('Components: TasksMain', function() {
  'use strict';

  var component,
    TestUtils = require('react/addons').addons.TestUtils,
    TaskStore = require('../../../../app/stores/tasks'),
    TaskMain = require('../../../../app/components/tasks/Main.jsx');

  beforeEach(function() {
    spyOn(TaskStore, 'fetch');
    component = TestUtils.renderIntoDocument(TaskMain());
  });

  afterEach(function() {
    component = undefined;
  });

  describe('.getInitialState()', function() {
    it('should have initial state', function() {
      expect(component.state.tasks).toEqual([]);
    });
  });

  describe('.onTaskStoreChange()', function() {
    beforeEach(function() {
      spyOn(component, 'setState');
      spyOn(component, 'isMounted');
    });
    it('should not call .setState() if not mounted', function() {
      component.isMounted.and.returnValue(false);
      component.onTaskStoreChange();
      expect(component.setState).not.toHaveBeenCalled();
    });
    it('should call .setState() if mounted', function() {
      component.isMounted.and.returnValue(true);
      component.onTaskStoreChange();
      expect(component.setState).toHaveBeenCalled();
    });
  });

});
