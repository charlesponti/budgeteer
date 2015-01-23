'use strict';

var React = require('react/addons');

var WeightTable = React.createClass({

  propTypes: {
    weights: React.PropTypes.array.isRequired
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
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
          {this.props.weights.map(function(weight) {
            return (
              <tr key={weight.get('_id')}>
                <td>{weight.getDate().toLocaleDateString()}</td>
                <td>{weight.get('kgs')+' kgs'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

});

module.exports = WeightTable;
