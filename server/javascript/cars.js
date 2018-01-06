exports.carSearch = function(req, res) {
  console.log(Object.keys(req.body));
  console.log(req.body);

  var fullPickUp = req.body.pickUp;
  var pickUp = fullPickUp.split(',')[0];
  var fullDropOff = req.body.dropOff;
  var dropOff = fullDropOff.split(',')[0];

  console.log(pickUp, dropOff);

  res.render('cars');
};
