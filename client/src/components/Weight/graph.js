import React from 'react';
import Highcharts from 'highcharts';

export default React.createClass({
  propTypes: {
    weights: React.PropTypes.array.isRequired
  },

  componentDidMount() {
    return this.drawChart(this.props.weights);
  },

  componentDidUpdate() {
    return this.drawChart(this.props.weights);
  },

  drawChart() {
    const weights = this.props.weights;

    new Highcharts.Chart({
      title: {
        text: '',
        x: 90,
        y: 30,
        floating: true
      },
      chart: {renderTo: 'weight-chart'},
      xAxis: {
        categories: weights.map(weight => weight.getDate().toLocaleDateString())
      },
      yAxis: {
        title: {text: 'Kilograms'}
      },
      tooltip: {valueSuffix: 'kgs'},
      series: [
        {
          name: 'Weight',
          data: weights.map(weight => parseFloat(weight.kgs))
        }
      ]
    });
  },

  /**
   * Render element
   * @return {ReactElement}
   */
  render() {
    return (
      <div id="weight-chart"></div>
    );
  }

});
