// exports.hotelSearch = function(req, res) {
//   console.log(Object.keys(req.body));
//   console.log(req.body);
//
//   var fullLocation = req.body.location;
//   var location = fullLocation.split(',')[0];
//   var object = [
//     {
//       city: 'San Fransisco',
//       roomType: 'economy',
//       price: 306,
//       avilableRooms: 25,
//       reviews: 1436,
//       hotelName: 'The Rittenhouse Hotel',
//       stars: 2,
//       date: 'Dec 7, Thu',
//       image: 'img/hotel2.jpeg'
//     },
//
//     {
//       city: 'San Fransisco',
//       roomType: 'economy',
//       price: 177,
//       avilableRooms: 35,
//       reviews: 2918,
//       hotelName: 'Hotel Bel-Air',
//       stars: 2,
//       date: 'Dec 7, Thu',
//       image: 'img/hotel3.jpeg'
//     }
//   ];
//   res.render('hotels', { data: object });
// };

exports.bookHotel = function(req, res) {
  console.log(req.body);
  req.session.hotel = req.body;
  var json_response = { status: 200 };
  res.send(json_response);
};
