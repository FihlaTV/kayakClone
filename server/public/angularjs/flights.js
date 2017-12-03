var flights = angular.module('flights', []);
// defining the login controller
flights.controller('flights', function($scope, $http) {
  console.log('in flights angular');

  //api or db
  $scope.flightList = [
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
  $scope.numberOfFlights = $scope.flightList.length;

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
