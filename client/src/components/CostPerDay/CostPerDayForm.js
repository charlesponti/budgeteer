import React from 'react';
import { History } from 'react-router';
import CostPerDayStore from './CostPerDayStore.js';

export default React.createClass({
  propTypes: {
    location: React.PropTypes.object.isRequired
  },

  mixins: [History],

  getInitialState() {
    return {
      record: this.props.location.item || {}
    };
  },

  _onSubmit(event) {
    event.preventDefault();

    var name = this.refs.itemName;
    var price = this.refs.itemPrice;
    var type = this.refs.itemType;

    return CostPerDayStore.add({
      name: name.value,
      price: price.value,
      type: type.value
    }).then(() => {
      this.history.pushState(null, '/cost-per-day');
    });
  },

  render() {
    return (
      <div className="panel panel-default" style={{maxWidth: '600px', margin: '0 auto'}}>
        <div className="panel-heading">
          <h3>New Cost Per Day Item</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this._onSubmit}>
            <input type="text" ref="itemName" className="form-control"/>
            <input type="number" step="any" ref="itemPrice" className="form-control"/>
            <select ref="itemType" className="form-control">
              <option value="monthly"> Monthly </option>
              <option value="yearly"> Yearly </option>
            </select>
            <button className="btn btn-default">Add</button>
          </form>
        </div>
      </div>
    );
  }
});
