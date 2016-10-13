var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Customer = require('../models/customer');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    Customer.findOne({ username: username }, function (err, customer) {
      if (err) { return callback(err); }

      if (!customer) { return callback(null, false); }

      // Make sure the password is correct
      customer.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }
        if (!isMatch) { return callback(null, false); }

        return callback(null, customer);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });