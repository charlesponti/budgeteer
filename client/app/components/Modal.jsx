'use strict';

var React = require('react');
var AppDispatcher = require('../dispatchers/App');
var TaskConstants = require('../constants/TaskConstants');

var Modal = React.createClass({

  /**
   * Name used in debugging
   * @type {String}
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

  dispatcherIndex: function(payload) {
    switch(payload.action) {
      case 'show-modal':
        this.setState(payload.data);
        this.toggleModal();
    }
  },

  componentWillMount: function() {
    AppDispatcher.register(this.dispatcherIndex);
  },

  toggleModal: function() {
    $(this.getDOMNode()).modal();
  },

  onButtonClick: function() {
    AppDispatcher.dispatch({ action: this.state.buttonEvent });
    this.toggleModal();
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
