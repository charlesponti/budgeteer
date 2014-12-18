'use strict';

var React = require('react');
var Chartist = require('react-chartist');
var WeightStore = require('../../stores/weight');

var WeightGraph = React.createClass({

  getInitialState: function() {
    return {
      labels: [],
      series: []
    };
  },

  onWeightStoreUpdate: function() {
    return this.setState({
      labels: WeightStore.getDates(),
      series: [WeightStore.getWeights()]
    });
  },

  /**
   * Listen for changes on WeightStore and update chart
   */
  componentWillMount: function() {
    return WeightStore.on('add', this.onWeightStoreUpdate);
  },

  /**
   * Render element
   * @return {ReactElement}
   */
  render: function() {
    return (
      <div>
        <Chartist data={this.state} type={'Line'} />
      </div>
    );
  }

});

module.exports = WeightGraph;
