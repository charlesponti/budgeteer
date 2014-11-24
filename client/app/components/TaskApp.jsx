'use strict';

// Module dependencies
var React = require('react');

var TabPanel = require('../mixins/TabPanel.jsx');

var TaskMain = require('./tasks/Main.jsx');
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
      className: 'col-xs-12'
    };
  }

});

module.exports = TaskApp;
