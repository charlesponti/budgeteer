'use strict';

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
          
          <div id='task-list'>
            
          </div>
          
          <div id='task-form'>
            
          </div>

        </div>
        
      </div>
    )
  }

});

module.exports = TaskMainView;
