const WeightGraph = React.createClass({

  drawChart: function() {
    var weights = this.props.weights;

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
