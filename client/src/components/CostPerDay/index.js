//import React from 'react';
//import { Link } from 'react-router';
import CostPerDayStore from './CostPerDayStore.js';
//import CostPerDayListItem from './CostPerDayListItem.js';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import costPerDayTemplate from './cost-per-day.html';
import costPerDayFormTemplate from './cost-per-day-form.html';
import costPerDayListItemTemplate from './cost-per-day-list-item.html';

export default angular
  .module('backpack.cost-per-day', [uirouter])
  .component('costPerDay', {
    restrict: 'E',
    template: costPerDayTemplate,
    controller: function() {
      this.items = CostPerDayStore.getRecords();
    }
  })
  .component('costPerDayListItem', {
    restrict: 'E',
    template: costPerDayListItemTemplate,
    bindings: { item: '=' },
    controller: function() {

    }
  })
  .component('costPerDayForm', {
    restrict: 'E',
    template: costPerDayFormTemplate,
    controller: function() {
      this.onSubmit = function() {
        event.preventDefault();

        var name = this.refs.itemName;
        var price = this.refs.itemPrice;
        var type = this.refs.itemType;

        return CostPerDayStore.add({
          name: name.value,
          price: price.value,
          type: type.value
        }).then(() => {
          this.history.pushState(null, '/cost-per-day');
        });
      }
    }
  })
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('cost-per-day', {
        url: '/cost-per-day',
        template: '<cost-per-day></cost-per-day>'
      })
      .state('new-cost-per-day', {
        url: '/cost-per-day/new',
        template: '<cost-per-day-form></cost-per-day-form>'
      })
  }]);
