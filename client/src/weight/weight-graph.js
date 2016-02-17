import Highcharts from 'highcharts'

export default {
  restrict: 'E',
  bindings: {weights: '<'},
  template: '<div id="weight-chart"></div>',
  controller: function () {
    this.drawChart = function () {
      const weights = this.weights

      const chart = new Highcharts.Chart({
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
          categories: weights.map((weight) => {
            return weight.date.toLocaleDateString()
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
            data: weights.map((weight) => parseFloat(weight.kgs))
          }
        ]
      })
    }
  }
}
