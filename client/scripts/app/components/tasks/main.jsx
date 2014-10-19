/** @jsx React.DOM */

'use strict';

var TaskForm = require('./form.jsx');
var TaskList = require('./list.jsx');

/**
 * Main view for the Tasks application
 */
var TaskMainView = React.createClass({

  /**
   * Render view
   */
  render: function() {
    return (
      <div className="row">
        
        <div className="col-sm-6 col-sm-offset-3" >
          <h1 className="text-center"> Tasks </h1>
          
          <TaskList id='task-list' />
          
          <TaskForm id='task-form' />

        </div>
        
      </div>
    )
  }

});

module.exports = TaskMainView;
