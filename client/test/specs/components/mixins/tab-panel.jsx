describe('Mixins: tab-panel', function() {

  var tabPanel;

  beforeEach(function() {
    var TabPanel = testRequire('mixins/TabPanel.jsx');
    tabPanel = TestUtils.renderIntoDocument(new TabPanel());
  });

  afterEach(function() {
    tabPanel = undefined;
  });

  describe('.getInitialState()', function() {
    it('should return correct state', function() {

    });
  });

});
