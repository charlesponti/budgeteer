import angular from 'angular';
import uirouter from 'angular-ui-router';
//import routes from './app/routes';
import navigation from './site-navigation.html';
import costPerDay from './components/CostPerDay';

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import './main.less';

angular.module('backpack', [uirouter, costPerDay.name])
  .directive('navigation', () => {
    return {
      restrict: 'E',
      template: navigation
    }
  })
  .config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }]);
