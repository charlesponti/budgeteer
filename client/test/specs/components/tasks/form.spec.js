describe('Tasks: Form', function() {
  'use strict';

  var form;
  var $ = require('jquery');
  var TestUtils = require('react/addons').addons.TestUtils;
  var AppActions = require('../../../../app/actions/app');
  var Form = require('../../../../app/components/tasks/Form.jsx');

  beforeEach(function() {
    spyOn($, 'ajax');
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
    it('should call createTask if no _id', function() {
      form.onSubmit(event);
      expect(AppActions.createTask).toHaveBeenCalled();
    });
    it('should call updateTask if _id', function() {
      form.state.record._id = '1234';
      form.onSubmit(event);
      expect(AppActions.updateTask).toHaveBeenCalled();
    });
  });

  describe('.onChange()', function() {
    it('should call setState with correct values', function() {
      form.refs._id.getDOMNode().value = '1234';
      form.refs.title.getDOMNode().value = 'foo';
      form.refs.description.getDOMNode().value = 'bar';
      spyOn(form, 'setState');
      form.onChange();
      var record = form.setState.calls.argsFor(0)[0].record;
      expect(record._id).toEqual('1234');
      expect(record.title).toEqual('foo');
      expect(record.description).toEqual('bar');
    });
  });

});
