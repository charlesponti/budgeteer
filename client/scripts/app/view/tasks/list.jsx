'use strict';

var TaskStore = require('../../store/tasks');

var TaskList = React.createClass({

  render: function() {
    return (
      <ul className="list-group">{todos}</ul>
    )
  }

});

module.exports = TaskList;
