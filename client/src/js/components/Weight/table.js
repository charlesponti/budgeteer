import React from 'react';
import { History } from 'react-router';
const classnames = require('classnames');
const ItemActionButtons = require('../../ItemActionButtons');
const WeightStore = require('./WeightStore');

export default React.createClass({
  propTypes: {
    weights: React.PropTypes.array.isRequired
  },

  mixins: [History],

  onEdit(weight) {
    this.history.pushState(weight, '/weight/new');
  },

  onRemove(weight) {
    const answer = window.confirm(`
      Are you sure you want to delete this weight?
    `);

    if (answer) {
      WeightStore.remove(weight);
    }
  },

  render() {
    const classes = classnames({
      'table': true,
      'hover': true,
      // Hide table if no weights
      'hide': this.props.weights.length === 0
    });

    return (
      <table className={classes}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weights.map((weight) => {
            return (
              <tr key={weight.id}>
                <td>{weight.getDate().toLocaleString()}</td>
                <td>{weight.kgs + ' kgs'}</td>
                <td>
                  <ItemActionButtons edit={this.onEdit.bind(this, weight)}
                                     remove={this.onRemove.bind(this, weight)}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

});
