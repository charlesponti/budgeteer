'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppConstants = require('./app').constants;
var AppDispatcher = require('./app').dispatcher;

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
   * the OPEN_MODAL action.
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
  renderIntoModalBody: function(component) {
    var node = this.refs.modalBody.getDOMNode();

    // Empty modal body if modal body isn't empty
    if (node.lastChild) {
      node.removeChild(node.lastChild);
    }

    // Render component to modal body
    React.render(component, node);
  },

  /**
   * Handle events from AppDispatcher
   * @param  {object} payload
   * @return {boolean}
   */
  dispatcherIndex: function(payload) {
    switch(payload.action) {
      case AppConstants.OPEN_MODAL:
        this.setState(payload.data);
        this.renderIntoModalBody(payload.data.component);
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
    this.getDOMNode().classList.add('open');
  },

  // Hide modal
  hide: function() {
    this.getDOMNode().classList.remove('open');
  },

  render: function() {
    return (
      <div className="modal ui-white">
        <div className="modal-header">
          <i className="fa fa-times fa-2x" onClick={this.hide}></i>
          <h4>{this.state.title}</h4>
        </div>
        <div className="modal-body" ref="modalBody"></div>
        <div className="modal-footer"></div>
      </div>
    );
  }

});

module.exports = Modal;
