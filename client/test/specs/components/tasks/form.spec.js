describe('Tasks: Form', function() {
  'use strict';

  var form;
  var TestUtils = require('react/addons').addons.TestUtils;
  var AppActions = require('../../../../app/actions/app');
  var Form = require('../../../../app/components/tasks/Form.jsx');

  beforeEach(function() {
    form = TestUtils.renderIntoDocument(Form({task: {}}));
  });

  afterEach(function() {
    form = undefined;
  });

  describe('.getInitialState()', function() {
    it('should return valid state', function() {
      expect(form.state.record._id).toEqual('');
      expect(form.state.record.title).toEqual('');
      expect(form.state.record.description).toEqual('');
    });
  });

  describe('.onSubmit()', function() {
    var task;
    beforeEach(function() {
      task = {
        title: { value: 'foo' },
        description: { value: 'bar' },
        category: { value: 'baz' }
      };
      spyOn(AppActions, 'createTask');
      spyOn(AppActions, 'updateTask');
      spyOn(form, 'getDOMNode');
    });
    afterEach(function() {
      task = undefined;
    });
    it('should call createTask if no _id', function() {

    });
    it('should call updateTask if _id', function() {

    });
  });

});
