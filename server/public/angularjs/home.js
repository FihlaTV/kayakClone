//loading the 'home' angularJS module

var home = angular.module('home', []);
// defining the login controller
home.controller('home', function($scope, $http) {
  console.log('in home angular');
});
