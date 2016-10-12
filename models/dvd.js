var mongoose = require('mongoose');

// Define our dvd schema
var DvdSchema   = new mongoose.Schema({
  name: String,
  genre: String,
  certification: String,
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Dvd', DvdSchema);