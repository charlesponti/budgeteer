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
   * Get initial state of component
   * @return {object}
   */
  getInitialState: function() {
    return { 
      title: undefined, 
      buttonText: undefined,
      children: undefined
    };
  },

  /**
   * Handle events from AppDispatcher
   * @param  {object} payload
   * @return {boolean}
   */
  dispatcherIndex: function(payload) {
    switch(payload.action) {
      case AppConstants.TASK_UPDATE:
      case AppConstants.TASK_CREATE:
        this.setState(payload.data);
        this.show();
        break;
      case AppConstants.TASK_UPDATED:
      case AppConstants.TASK_CREATED:
        this.hide();
        break;
    }
    return true;
  },

  componentWillMount: function() {
    AppDispatcher.register(this.dispatcherIndex);
  },

  /**
   * Show modal
   */
  show: function() {
    $(this.getDOMNode()).modal('show');
  },
  
  /**
   * Hide modal
   */
  hide: function() {
    $(this.getDOMNode()).modal('hide');
  },

  onButtonClick: function() {
    AppDispatcher.dispatch({ action: this.state.buttonEvent });
  },

  renderButtons: function() {
    return (
      <button type="button"
        className='btn btn-success'
        onClick={this.onButtonClick}>
        {this.state.buttonText}
      </button>
    )
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
              {this.state.children}
            </div>
            <div className="modal-footer">
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = Modal;
