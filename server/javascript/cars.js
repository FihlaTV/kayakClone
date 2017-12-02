exports.carSearch = function(req, res) {
  console.log(Object.keys(req.body));
  console.log(req.body);

  var fullPickUp = req.body.pickUp[0];
  var pickUp = fullPickUp.split(',')[0];
  var fullDropOff = req.body.dropOff[0];
  var dropOff = fullDropOff.split(',')[0];

  console.log(pickUp, dropOff);

  res.render('cars');
};
