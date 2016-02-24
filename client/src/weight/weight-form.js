import template from './weight-form.html'
import angular from 'angular'

export default {
  restrict: 'E',
  template,
  controller: [
    '$state',
    '$stateParams',
    'Weight',
    function ($state, $stateParams, Weight) {
      if (angular.isObject($stateParams.record)) {
        this.record = new Weight($stateParams.record)
      } else {
        this.record = new Weight({date: new Date()})
      }

      this.getWeightValues = (weight) => {
        let kgs
        let lbs
        const diff = 2.2046

        switch (this.record.measurement) {
          case 'lbs':
            kgs = parseFloat(weight / diff)
            lbs = parseFloat(weight)
            break
          default:
            kgs = parseFloat(weight)
            lbs = parseFloat(weight * diff)
        }

        return {kgs, lbs}
      }

      this.onSubmit = () => {
        // Dispatch event to create weight
        Weight
          .save(this.generateWeightRecord(), () => $state.go('weights'))
      }

      this.generateWeightRecord = () => {
        const {kgs, lbs} = this.getWeightValues(this.record.amount)

        return {
          _id: this.record._id,
          kgs,
          lbs,
          date: this.record.date
        }
      }
    }
  ]
}
