'use strict';

var React = require('react');

var AppActions = require('_/client/js/app').actions;
var WeightForm = require('./form.jsx');

var WeightAddButton = React.createClass({

  onClick: function() {
    AppActions.loadModal({
      title: 'Add Weight',
      component: <WeightForm weight={{}} />
    });
  },

  render: function() {
    return (
      <button onClick={this.onClick} className="btn add btn-default">
      +
      </button>
    );
  }

});

module.exports = WeightAddButton;
