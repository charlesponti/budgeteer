'use strict';

var google = window.google;
var React = require('react');
var WeightStore = require('../../stores/weight');

var WeightGraph = React.createClass({

  getInitialState: function() {
    return {
      labels: [],
      series: []
    };
  },

  drawChart: function() {
    var i = 0;
    var weights = this.props.weights;
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Weight');
    data.addRows(weights.length);
    weights.forEach(function(weight) {
      data.setCell(i, 0, new Date(weight.get('date')));
      data.setCell(i, 1, weight.get('kgs'));
      return i++;
    });
    return this.chart.draw(data);
  },

  componentDidMount: function() {
    this.chart = new google.visualization.LineChart(this.getDOMNode());
  },

  componentDidUpdate: function() {
    return this.drawChart(this.props.weights);
  },

  /**
   * Render element
   * @return {ReactElement}
   */
  render: function() {
    return (
      <div id="weight-chart"></div>
    );
  }

});

module.exports = WeightGraph;
