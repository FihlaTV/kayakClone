exports.loadBookHotel = function(req, res) {
  if (req.session.email) {
    res.send(req.session.hotel);
  } else {
    var json_response = { status: 400 };
    res.send(json_response);
  }
};
