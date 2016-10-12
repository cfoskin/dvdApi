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

// Execute before each customer.save() call
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

module.exports = mongoose.model('customer', CustomerSchema);