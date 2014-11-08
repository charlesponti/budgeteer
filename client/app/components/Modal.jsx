'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppConstants = require('../constants/App');
var AppDispatcher = require('../dispatchers/App');

/**
 * Modal Componenet
 * @type {ReactElement}
 */
var Modal = React.createClass({

  /**
   * Name used in debugging
   * @type {string}
   */
  displayName: 'Modal',

  /**
   * Get initial state of component. The modal element is rendered on
   * initial page load and remain hidden until the AppDispatcher fires
   * the SHOW_MODAL action.
   * @return {object}
   */
  getInitialState: function() {
    return { 
      title: undefined
    };
  },

  /**
   * Render componet to modal body
   * @param  {ReactElement} component
   */
  renderBody: function(component) {
    var body = this.getDOMNode().querySelector('.modal-body');
    
    // Empty modal body
    body.innerHTML = '';

    // Render component to modal body
    React.render(component, body);
  },

  /**
   * Handle events from AppDispatcher
   * @param  {object} payload
   * @return {boolean}
   */
  dispatcherIndex: function(payload) {
    switch(payload.action) {
      case AppConstants.SHOW_MODAL:
        this.setState(payload.data);
        this.renderBody(payload.data.component);
        this.show();
        break;
      case AppConstants.CLOSE_MODAL:
        this.hide();
        break;
    }
    
    // Return true for promise
    return true;
  },

  // Perform logic when component will get mounted to DOM
  componentWillMount: function() {
    AppDispatcher.register(this.dispatcherIndex);
  },

  // Show modal
  show: function() {
    $(this.getDOMNode()).modal('show');
  },
  
  // Hide modal
  hide: function() {
    $(this.getDOMNode()).modal('hide');
  },

  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-center">{this.state.title}</h3>
            </div>
            <div className="modal-body">
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = Modal;
