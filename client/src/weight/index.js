import angular from 'angular'
import uirouter from 'angular-ui-router'
import WeightGraph from './weight-graph'
import WeightTable from './weight-table'
import weightList from './weight-list.html'
import WeightForm from './weight-form'

export default (
  angular
  .module('backpack.weights', [uirouter, 'ngResource'])
  .factory('Weight', ['$resource', function ($resource) {
    return $resource('/weights', {}, {
      get: {
        isArray: true,
        transformResponse (data, headers) {
          return angular.fromJson(data).map((weight) => {
            weight.date = new Date(weight.date)
            return weight
          })
        }
      }
    })
  }])
  .component('weights', {
    restrict: 'E',
    template: weightList,
    controller: ['Weight', function (Weight) {
      Weight.get({}, (data) => {
        this.weights = data
      })
    }]
  })
  .component('weightGraph', WeightGraph)
  .component('weightTable', WeightTable)
  .component('weightForm', WeightForm)
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('weights', {
      url: '/weights',
      template: '<weights></weights>'
    })
    .state('new-weight', {
      url: '/weights/new',
      template: '<weight-form></weight-form>'
    })
  }])
)
