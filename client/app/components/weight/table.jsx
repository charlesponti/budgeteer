'use strict';

var React = require('react');

var WeightTable = React.createClass({

  propTypes: {
    weights: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weights.map(function(weight) {
            return (
              <tr>
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
