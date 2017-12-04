var flights = angular.module('flights', []);
// defining the login controller
flights.controller('flights', function($scope, $http) {
  $scope.bookFlightFinal = function() {
    $http({
      method: 'POST',
      url: '/bookFlight',
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

  $scope.showFlightDetails = function(hotelObj) {
    $http({
      method: 'POST',
      url: '/flightDetails',
      data: oneHotel
    })
      .success(function(data) {
        // window.location.assign('/hotelDetails');
        console.log('Success');
      })
      .error(function(error) {
        alert('error');
      });
  };

  $scope.saveFlightDetails = function(flightObj) {
    console.log('inside saveFlightData');
    // oneFlight = flightObj;
    console.log('inside showflightDetails function', oneFlight);
    $http({
      method: 'POST',
      url: '/flightsDetails',
      data: oneFlight
    })
      .success(function(data) {
        window.location.assign('/flightDetails');
      })
      .error(function(error) {
        alert('error');
      });
  };
});
