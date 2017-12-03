//loading the 'home' angularJS module

var home = angular.module('home', []);
// defining the login controller
home.controller('home', function($scope, $http) {
  console.log('in home angular');

  $scope.searchHotels = function() {
    console.log('inside the serachflights of angular');

    console.log($scope.date, $scope.city);
    // $http({
    //   method: 'POST',
    //   url: '/',
    //   data: {
    //     email: $scope.email,
    //     password: $scope.password
    //   }
    // })
    //   .success(function(data) {
    //     // checking the response data for statusCode
    //     if (data.statusCode == 401) {
    //       $scope.invalid_login = false;
    //       $scope.unexpected_error = true;
    //     } else
    //       // Making a get call to the '/redirectToHomepage' API
    //
    //       window.location.assign('/homepage');
    //   })
    //   .error(function(error) {
    //     $scope.unexpected_error = false;
    //     $scope.invalid_login = true;
    //   });
  };
});
