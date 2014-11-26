'use strict';

// Module dependencies
var React = require('react');

var TaskMain = require('./tasks/Main.jsx');
var TabPanel = require('../mixins/TabPanel.jsx');
var CategoryMain = require('./categories/Main.jsx');

var TaskApp = React.createClass({

  mixins: [TabPanel],

  getDefaultProps: function() {
    return {
      tabs: {
        'Tasks': <TaskMain />,
        'Categories': <CategoryMain />
      },
      default: 'Tasks',
      className: 'container-fluid'
    };
  }

});

module.exports = TaskApp;
