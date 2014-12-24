'use strict';

var React = require('react');
var WeightStore = require('../../stores/weight');

var WeightGraph = React.createClass({

  drawChart: function() {
    var weights = this.props.weights;
    new Highcharts.Chart({
      title: {
        text: '',
        x: 90,
        y: 30,
        floating: true
      },
      chart: {
        renderTo: 'weight-chart'
      },
      xAxis: {
        categories: weights.map(function(weight) {
          return weight.getDate().toLocaleDateString();
        })
      },
      yAxis: {
        title: {
          text: 'Kilograms'
        }
      },
      tooltip: {
        valueSuffix: 'kgs'
      },
      series: [
        {
          name: 'Weight',
          data: weights.map(function(weight) {
            return weight.get('kgs');
          })
        }
      ]
    });
  },

  componentDidMount: function() {
    return this.drawChart(this.props.weights);
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
