'use strict';

// Declare app level module which depends on views, and components
angular.module('ngSocial', [
  'ngRoute',
  'ngSocial.view1',
  'ngSocial.view2',
  'ngSocial.facebook',
    'ngFacebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
