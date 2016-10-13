var Dvd = require('../models/dvd');

// Create endpoint /api/dvds for POSTS
exports.postDvds = function(req, res) {
    // Create a new instance of the Dvd model
    var dvd = new Dvd();
    // Set the dvd properties that came from the POST data
    dvd.name = req.body.name;
    dvd.genre = req.body.genre;
    dvd.certification = req.body.certification;
    dvd.customerId = req.user._id;

    // Save the dvd and check for errors
    dvd.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Dvd added to the collection!', data: dvd });
    });
};

// Create endpoint /api/dvds for GET
exports.getDvds = function(req, res) {
    // Use the Dvd model to find all dvds
  Dvd.find({ customerId: req.user._id }, function(err, dvds) {
    if (err)
      res.send(err);

    res.json(dvds);
  });
};


// Create endpoint /api/dvd/:dvd_id for GET
exports.getDvd = function(req, res) {
  // Use the Dvd model to find a specific dvd
  Dvd.find({ customerId: req.user._id, _id: req.params.dvd_id }, function(err, dvd) {
    if (err)
      res.send(err);
    res.json(dvd);
  });
};

exports.putDvd = function(req, res) {
  // Use the Dvd model to find a specific dvd
  Dvd.update({ customerId: req.user._id, _id: req.params.dvd_id }, function(err, number, raw) {
    if (err)
      res.send(err);

    res.json({ message: number + ' updated' });
  });
};

// Create endpoint /api/dvds/:dvd_id for DELETE
exports.deleteDvd = function(req, res) {
    // Use the Dvd model to find a specific dvd and remove it
    Dvd.remove({ customerId: req.user._id, _id: req.params.dvd_id }, function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Dvd is returned to the store!' });
    });
};
