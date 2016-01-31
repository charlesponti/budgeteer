import React from 'react';
import { History } from 'react-router';
import ItemActionButtons from '../../ItemActionButtons.js';
import CostPerDayStore from './CostPerDayStore.js';

export default React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  mixins: [History],

  _onEdit() {
    this.history.pushState(this.props.item, '/cost-per-day/new');
  },

  _onRemove() {
    return CostPerDayStore.remove(this.props.item).then(() => {
      this.history.pushState(null, '/cost-per-day');
    });
  },

  render() {
    const item = this.props.item;
    return (
      <li className="list-group-item" key={item.id}>
        <b>{item.name}</b>
                <span className="pull-right">
                    <ItemActionButtons edit={this._onEdit} remove={this._onRemove}/>
                </span>
        <span className="pull-right">{item.costPerDay}</span>
      </li>
    );
  }
});

