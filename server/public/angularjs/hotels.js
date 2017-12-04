var hotels = angular.module('hotels', []);
// defining the login controller
hotels.controller('hotels', function($scope, $http) {
  console.log('in hotels angular');
  var oneHotel = {};
  //api or db
  // $scope.hotelList = [
  //   {
  //     title: 'abc',
  //     location: 'sjc',
  //     price: '100',
  //     ratingNumber: '4',
  //     reviews: '10000'
  //   },
  //   {
  //     title: 'abc1',
  //     location: 'sjc1',
  //     price: '1001',
  //     ratingNumber: '4.1',
  //     reviews: '100001'
  //   }
  // ];
  //
  // //on success of api
  // $scope.numberOfHotels = $scope.hotelList.length;

  $scope.bookHotel = function(hotelObj) {
    oneHotel = hotelObj;
    console.log(oneHotel);
    // window.location.assign('/hotelDetails');
    $http({
      method: 'POST',
      url: '/hotelDetails',
      data: oneHotel
    })
      .success(function(data) {
        window.location.assign('/hotelDetails');
      })
      .error(function(error) {
        alert('error');
      });
  };

  $scope.loadHotelDetails = function() {
    $http({
      method: 'POST',
      url: '/loadHotelDetails'
    })
      .success(function(data) {
        console.log('in load hotel details angular');
        console.log(data);
      })
      .error(function(error) {
        alert('error');
      });
  };
});
