'use strict';

var React = require('react');

var WeightGraph = React.createClass({

  /**
   * Create initial state for component
   * @param {object}
   */
  getInitialState: function() {
    return {
      labels: [
        "January", "February", "March", "April", "May", "June", "July"
      ],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
  },

  /**
   * Create new Chart
   */
  componentDidMount: function() {
    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx).Line(this.state);
  },

  /**
   * Render element
   * @return {ReactElement}
   */
  render: function() {
    return (
      <canvas id="myChart" width="400" height="400"></canvas>
    );
  }

});

module.exports = WeightGraph;
