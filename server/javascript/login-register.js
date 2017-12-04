exports.login = function(req, res) {
  console.log(req.body);
  req.session.email = req.body.email;
  console.log('in login js');
  if (
    req.session.hotelDetailsObj != undefined &&
    req.session.hotelDetailsObj != null
  ) {
    res.render('hotel-payment');
  } else {
    res.render('home');
  }
};

exports.register = function(req, res) {
  console.log(req.body);
  console.log('in register function js');
  req.session.email = req.body.email;
  if (
    req.session.hotelDetailsObj != undefined &&
    req.session.hotelDetailsObj != null
  ) {
    req.render('hotelPayment');
  } else {
    res.render('home');
  }
};
