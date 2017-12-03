var hotels = angular.module('hotels', []);
// defining the login controller
hotels.controller('hotels', function($scope, $http) {
  console.log('in hotels angular');
  $scope.loadHotels = function() {
    console.log('in angular load hotels');
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
    //api or db
    $scope.hotelList = [
      {
        title: 'abc',
        location: 'sjc',
        price: '100',
        ratingNumber: '4',
        reviews: '10000'
      },
      {
        title: 'abc1',
        location: 'sjc1',
        price: '1001',
        ratingNumber: '4.1',
        reviews: '100001'
      }
    ];

    //on success of api
    $scope.numberOfHotels = $scope.hotelList.length;
  };

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
