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
      title: undefined,
      component: undefined
    };
  },

  /**
   * Handle events from AppDispatcher
   * @param  {object} payload
   * @return {boolean}
   */
  dispatcherIndex: function(payload) {
    switch(payload.action) {
      case AppConstants.SHOW_MODAL:
        this.replaceState(payload.data);
        this.show();
        break;
      case AppConstants.CLOSE_MODAL:
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

  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-center">{this.state.title}</h3>
            </div>
            <div className="modal-body">
              {this.state.component}
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
