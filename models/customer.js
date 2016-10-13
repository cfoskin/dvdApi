var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our customer schema
var CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

CustomerSchema.pre('save', function(callback) {
  var customer = this;
  // Break out if the password hasn't changed
  if (!customer.isModified('password')) return callback();
  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
    bcrypt.hash(customer.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      customer.password = hash;
      callback();
    });
  });
});


CustomerSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('customer', CustomerSchema);