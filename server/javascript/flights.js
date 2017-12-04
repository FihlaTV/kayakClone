exports.flightSearch = function(req, res) {
  console.log(Object.keys(req.body));
  console.log(req.body);

  var fullFromPlace = req.body.fromPlace[0];
  var fromPlace = fullFromPlace.split(',')[0];
  var fullToPlace = req.body.toPlace[0];
  var toPlace = fullToPlace.split(',')[0];

  console.log(fromPlace, toPlace);

  res.render('flights');
};

exports.loadFlightDetails = function(req, res) {
  if (
    req.session.flightDetailsObj != undefined &&
    req.session.flightDetailsObj != null
  ) {
    res.send(req.session.flightDetailsObj);
  }
};
