exports.loadBookHotel = function(req, res) {
  if (req.session.email) {
    res.send(req.session.hotel);
  } else {
    var json_response = { status: 400 };
    res.send(json_response);
  }
};

exports.loadFinalBookingHotel = function(req, res) {
  res.send(req.session.hotelDetailsObj);
};

exports.hotelsPaymentDetails = function(req, res) {
  var email = req.session.email;
  res.render('success-payment', { userObj: email });
};
