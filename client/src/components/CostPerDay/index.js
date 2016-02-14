import angular from 'angular';
import uirouter from 'angular-ui-router';

import costPerDayTemplate from './cost-per-day.html';
import costPerDayFormTemplate from './cost-per-day-form.html';
import costPerDayListItemTemplate from './cost-per-day-list-item.html';

export default angular
  .module('backpack.cost-per-day', [uirouter, 'ngResource'])
  .factory('CostPerDayResource', ['$resource', function($resource) {
    return $resource('/cost-per-day', {}, {
      query: {
        isArray: true,
        transformResponse: function(data, headers) {
          return angular.fromJson(data).items;
        }
      }
    })
  }])
  .component('costPerDay', {
    restrict: 'E',
    template: costPerDayTemplate,
    controller: ['CostPerDayResource', function(CostPerDayResource) {
      this.items = CostPerDayResource.query();
    }]
  })
  .component('costPerDayListItem', {
    restrict: 'E',
    template: costPerDayListItemTemplate,
    bindings: { item: '=' },
    controller: ['$state', function($state) {
      this.edit = function(item) {
        $state.go('new-cost-per-day', {record: item});
      };

    }]
  })
  .component('costPerDayForm', {
    restrict: 'E',
    template: costPerDayFormTemplate,
    controller: ['$state', '$stateParams', function($state, $stateParams) {
      if (angular.isObject($stateParams.record)) {
        this.record = $stateParams.record;
      } else {
        this.record = {};
      }

      this.onSubmit = function() {
        var name = this.record.name;
        var price = this.record.price;
        var type = this.record.type;

        CostPerDayStore
          .add({name, price, type})
          .then(() => {
            $state.go('cost-per-day');
          });
      }
    }]
  })
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('cost-per-day', {
        url: '/cost-per-day',
        template: '<cost-per-day></cost-per-day>'
      })
      .state('new-cost-per-day', {
        url: '/cost-per-day/new',
        template: '<cost-per-day-form></cost-per-day-form>',
        params : { record: null }
      })
  }]);
