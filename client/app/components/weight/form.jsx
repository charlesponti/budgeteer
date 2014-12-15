'use strict';

var React = require('react');

var AppConstants = require('../../constants/app');
var AppDispatcher = require('../../dispatchers/app');

var WeightForm = React.createClass({

  onSubmit: function(e) {
    var el = this.getDOMNode();

    // Prevent default action
    e.preventDefault();

    AppDispatcher.dispatch({
      action: AppConstants.WEIGHT_CREATE,
      data: {
        weight: el.weight.value,
        date: el.date.value
      }
    });
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    return(
      <form role="form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label for="weight"> Weight </label>
          <input className="form-control" type="number" name="weight" />
        </div>
        <div className="form-group">
          <label for="date"> Date </label>
          <input className="form-control" type="date" name="date" />
        </div>
        <br/>
        <button className="btn btn-default pull-right"> Add Weight </button>
      </form>
    );
  }

});

module.exports = WeightForm;
