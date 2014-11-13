describe('Tasks: Form', function() {
  'use strict';

  var form;

  beforeEach(function() {
    var Form = testRequire('components/tasks/Form.jsx');
    form = TestUtils.renderIntoDocument(new Form());
  });

  afterEach(function() {
    form = undefined;
  });

  describe('.getInitialState()', function() {
    it('should return valid state', function() {
      expect(form.state.record._id).to.equal('');
      expect(form.state.record.title).to.equal('');
      expect(form.state.record.description).to.equal('');
    });
  });

  describe('.componentWillMount()', function() {

  });


});
