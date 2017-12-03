//loading the 'home' angularJS module

var home = angular.module('home', []);
// defining the home controller
home.controller('home', function($scope, $http) {
  console.log('in home angular');
  $scope.hotelList = [];
  $scope.searchHotels = function() {
    console.log('inside the serachflights of angular');
    var startDate = document.getElementById('startDate').name;
    console.log(startDate, $scope.city);
    $http({
      method: 'POST',
      url: '/searchHotelsWithCaching',
      data: {
        city: 'San Fransisco',
        date: 'Dec 7, Thu'
      }
    })
      .success(function(data) {
        // checking the response data for statusCode
        $scope.hotelList = data;
        console.log(data);
        windows.location.assign('/hotels');
      })
      .error(function(error) {
        $scope.unexpected_error = false;
        $scope.invalid_login = true;
      });
  };

  $scope.numberOfHotels = $scope.hotelList.length;

  $scope.bookHotel = function(index) {
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
