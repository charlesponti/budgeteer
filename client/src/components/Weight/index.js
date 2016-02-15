import angular from 'angular';
import uirouter from 'angular-ui-router';
const WeightGraph = require('./weight-graph');
const WeightTable = require('./weight-table');
const weightList = require('./weight-list.html');
import WeightForm from './weight-form';

export default (
angular
  .module('backpack.weights', [uirouter, 'ngResource'])
  .factory('WeightResource', ['$resource', function($resource) {
    return $resource('/weights', {}, {
      query: {
        isArray: true,
        transformResponse(data, headers) {
          return angular.fromJson(data).items;
        }
      }
    })
  }])
  .component('weights', {
    restrict: 'E',
    template: weightList,
    controller: ['WeightResource', function(WeightResource) {
      this.weights = WeightResource.query();
    }]
  })
  .component('weightGraph', WeightGraph)
  .component('weightTable', WeightTable)
  .component('weightForm', WeightForm)
  .config(['$stateProvider', function($stateProvider) {
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
);
