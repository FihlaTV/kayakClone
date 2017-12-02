exports.hotelSearch = function(req, res) {
  console.log(Object.keys(req.body));
  console.log(req.body);

  var fullLocation = req.body.location;
  var location = fullLocation.split(',')[0];
  console.log(location);
  res.render('hotels');
};
