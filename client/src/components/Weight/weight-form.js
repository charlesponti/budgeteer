import template from './weight-form.html';

export default {
  restrict: 'E',
  template,
  controller: ['$state', '$stateParams', function($state, $stateParams) {
    if (angular.isObject($stateParams.record)) {
      $stateParams.record.date = new Date();
    }

    this.getWeightValues = function(weight) {
      const diff = 2.2046;

      switch (this.refs.measurement.value) {
        case 'lbs':
          return {
            kgs: weight / diff,
            lbs: weight
          };
        default:
          return {
            kgs: weight,
            lbs: weight * diff
          };
      }
    };

    this.onSubmit = function() {
      // Dispatch event to create weight
      WeightStore
        .add(this.generateWeightRecord())
        .then(() => {
          return this.history.pushState(null, '/weight');
        });
    };

    this.generateWeightRecord = function() {
      const weight = this.getWeightValues(this.record.amount);

      return {
        _id: this.record.weight._id,
        kgs: weight.kgs,
        lbs: weight.lbs,
        created: this.refs.date.value
      };
    };

    this.onWeightChange = function() {
      return this.setState({
        weight: this.generateWeightRecord()
      });
    }
  }]
}
