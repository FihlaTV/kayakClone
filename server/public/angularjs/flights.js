var flights = angular.module('flights', []);
// defining the login controller
flights.controller('flights', function($scope, $http) {
  $scope.loadFlightFinal = function() {
    console.log('in flights final');
    $http({
      method: 'POST',
      url: '/loadFlightPayment'
    })
      .success(function(data) {
        $scope.flightData = data;
        console.log($scope.flightData);
        $scope.numOfPassengersArr = [];
        for (var z = 0; z < data.noOfPassengers; z++) {
          $scope.numOfPassengersArr.push(z);
        }
        console.log('in load flight final');
        console.log(data);
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

  $scope.saveFlightDetails = function(oneFlight) {
    console.log('inside saveFlightData');
    // oneFlight = flightObj;
    console.log(oneFlight);
    $http({
      method: 'POST',
      url: '/flightsDetails',
      data: oneFlight
    })
      .success(function(data) {
        if (data.status === 'session') {
          window.location.assign('/flightPayment');
        } else {
          window.location.assign('/account');
        }
      })
      .error(function(error) {
        alert('error');
      });
  };
});
