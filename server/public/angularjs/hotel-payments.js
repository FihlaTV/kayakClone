var hotelPayments = angular.module('hotelPayments', []);
// defining the login controller
hotelPayments.controller('hotelPayments', function($scope, $http) {
  $scope.loadHotel = function() {
    console.log('in angular load hotel');
    $scope.loadedHotels = {};
    //api or db
    $http({
      method: 'POST',
      url: '/loadBookHotel'
    })
      .success(function(data) {
        $scope.loadedHotels = data;
        console.log('in loadBookHotel angular' + data);
      })
      .error(function(error) {
        alert('error');
      });
  };
});
