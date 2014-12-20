'use strict';

var React = require('react');

var AppConstants = require('../../constants/app');
var AppDispatcher = require('../../dispatchers/app');

var WeightForm = React.createClass({

  onSubmit: function(e) {
    // Prevent default action
    e.preventDefault();

    var kgs, lbs;
    var el = this.getDOMNode();
    var diff = 2.2046;
    var weight = el.weight.value;
    var date = (new Date(el.date.value)).getTime();

    switch(el.measurement.value) {
      case 'lbs':
        kgs = weight / diff;
        lbs = weight;
        break;
      default:
        kgs = weight;
        lbs = weight * diff;
        break;
    }

    // Dispatch event to create weight
    AppDispatcher.dispatch({
      action: AppConstants.WEIGHT_CREATE,
      data: {
        kgs: kgs,
        lbs: lbs,
        date: date
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
          <input className="form-control" name="weight" placeholder='Weight' required/>
        </div>
        <div className="form-group">
          <label for="measurement"> Measurement </label>
          <select className="form-control" name="measurement" required>
            <option value="kgs"> Kilograms </option>
            <option value="lbs"> Pounds </option>
          </select>
        </div>
        <div className="form-group">
          <label for="date"> Date </label>
          <input className="form-control" type="date" name="date" required/>
        </div>
        <br/>
        <button className="btn btn-default pull-right"> Add Weight </button>
      </form>
    );
  }

});

module.exports = WeightForm;
