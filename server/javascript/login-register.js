exports.login = function(req, res) {
  console.log(req.body);
  req.session.email = req.body.email;
  console.log('in login js');
  res.render('home');
};

exports.register = function(req, res) {
  console.log(req.body);
  console.log('in register function js');
  req.session.email = req.body.email;
  res.render('home');
};
