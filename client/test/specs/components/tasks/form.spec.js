describe('Tasks: Form', function() {
  'use strict';

  // Require spec helper
  require('../../../spec_helper');

  var form;
  var $ = require('jquery');
  var TestUtils = require('react/addons').addons.TestUtils;
  var TaskModel = require('../../../../app/models/task');
  var AppActions = require('../../../../app/actions/app');
  var Form = require('../../../../app/components/tasks/Form.jsx');

  beforeEach(function() {
    spyOn($, 'ajax');
    form = TestUtils.renderIntoDocument(Form());
  });

  afterEach(function() {
    form = undefined;
  });

  describe('.getInitialState()', function() {
    it('should load with empty task', function() {
      var task = form.state.task;
      expect(task.get('_id')).toEqual(undefined);
      expect(task.get('title')).toEqual('');
      expect(task.get('description')).toEqual('');
    });
    it('should return task in props', function() {
      form.props.task = new TaskModel({ _id: 1, title: 'foo', description: 'bar' });
      var task = form.getInitialState().task;
      expect(task.get('_id')).toEqual(1);
      expect(task.get('title')).toEqual('foo');
      expect(task.get('description')).toEqual('bar');
    });
  });

  describe('.onSubmit()', function() {
    var task, event;
    beforeEach(function() {
      event = {
        preventDefault: function() {}
      };
      spyOn(AppActions, 'createTask');
      spyOn(AppActions, 'updateTask');
    });
    afterEach(function() {
      task = undefined;
    });
    it('should call createTask if is new', function() {
      form.onSubmit(event);
      expect(AppActions.createTask).toHaveBeenCalled();
    });
    it('should call updateTask if _id', function() {
      form.state.task.isNew = false;
      form.onSubmit(event);
      expect(AppActions.updateTask).toHaveBeenCalled();
    });
  });

  describe('.onChange()', function() {
    it('should call setState with correct values', function() {
      form.refs._id.getDOMNode().value = '1234';
      form.refs.title.getDOMNode().value = 'foo';
      form.refs.description.getDOMNode().value = 'bar';
      form.onChange();
      var task = form.state.task;
      expect(task.get('_id')).toEqual('1234');
      expect(task.get('title')).toEqual('foo');
      expect(task.get('description')).toEqual('bar');
    });
  });

});
