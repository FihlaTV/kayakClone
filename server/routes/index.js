/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('home');
};

exports.account = function(req, res) {
  //
  if (req.session.email) {
    res.render('user-profile');
  } else {
    res.render('login-register');
  }
};
