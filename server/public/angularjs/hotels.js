var hotels = angular.module('hotels', []);
// defining the login controller
hotels.controller('hotels', function($scope, $http) {
  console.log('in hotels angular');
  var oneHotel = {};

  $scope.bookHotel = function(hotelObj) {
    oneHotel = hotelObj;
    console.log(oneHotel);
    // window.location.assign('/hotelDetails');
    $http({
      method: 'POST',
      url: '/hotelsDetails',
      data: oneHotel
    })
      .success(function(data) {
        window.location.assign('/hotelDetails');
      })
      .error(function(error) {
        alert('error');
      });
  };
  $scope.getStars = function(stars) {
    var arr = [];
    for (var z = 0; z < stars; z++) {
      arr.push(z);
    }
    // return new Array(stars);
    return arr;
  };

  $scope.loadHotelDetails = function() {
    $http({
      method: 'POST',
      url: '/loadHotelDetails'
    })
      .success(function(data) {
        console.log('in load hotel details angular');
        $scope.loadHotelDetails = data;
        console.log(data);
      })
      .error(function(error) {
        alert('error');
      });
  };

  $scope.bookHotelFinal = function() {
    $http({
      method: 'POST',
      url: '/bookHotelFinal'
    })
      .success(function(data) {
        if (data.status === 'session') {
          window.location.assign('/hotelPayment');
        } else {
          window.location.assign('/account');
        }
      })
      .error(function(error) {
        alert('error');
      });
  };
});
