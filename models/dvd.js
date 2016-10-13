var mongoose = require('mongoose');

var DvdSchema   = new mongoose.Schema({
  name: String,
  genre: String,
  certification: String,
  userId: String
});

module.exports = mongoose.model('Dvd', DvdSchema);