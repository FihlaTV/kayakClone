/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('home');
};

exports.account = function(req, res) {
  res.render('user-profile');
};
