var flights = angular.module('flights', []);
// defining the login controller
flights.controller('flights', function($scope, $http) {
  $scope.bookFlight = function(index) {
    console.log($scope.hotelList[index]);
    $http({
      method: 'POST',
      url: '/bookHotel',
      data: $scope.hotelList[index]
    })
      .success(function(data) {
        console.log(data);
        window.location.assign('/hotelPayment');
      })
      .error(function(error) {
        alert('error');
      });
  };
});
