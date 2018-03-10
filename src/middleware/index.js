var auth = require('basic-auth');
var User = require('../models/users');


function authenticateUser (req, res, next) {
  var user = auth(req);

  if (!user) {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  } else {
    User.authenticate(user.name, user.pass, function (err, user) {
      if (err) {
        var err = new Error('Incorrect email or password. Please try again');
        err.status = 403;
        return next(err);
      } else {
        req.authenticatedUser = user;
        next();
      }
    });
  }
}

module.exports.authenticateUser = authenticateUser;
