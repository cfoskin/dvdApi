var Dvd = require('../models/dvd');

// Create endpoint /api/dvds for POSTS
exports.postDvds = function(req, res) {
    // Create a new instance of the Dvd model
    var dvd = new Dvd();
    // Set the dvd properties that came from the POST data
    dvd.name = req.body.name;
    dvd.genre = req.body.genre;
    dvd.certification = req.body.certification;
    dvd.quantity = req.body.quantity;
    // Save the dvd and check for errors
    dvd.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Dvd added to the dvdStore!', data: dvd });
    });
};

// Create endpoint /api/dvds for GET
exports.getDvds = function(req, res) {
    // Use the Dvd model to find all dvd
    Dvd.find(function(err, dvds) {
        if (err)
            res.send(err);
        res.json(dvds);
    });
};

// Create endpoint /api/dvds/:dvd_id for GET
exports.getDvd = function(req, res) {
    // Use the Dvd model to find a specific dvd
    Dvd.findById(req.params.dvd_id, function(err, dvd) {
        if (err)
            res.send(err);
        res.json(dvd);
    });
};

// Create endpoint /api/dvds/:dvd_id for PUT
exports.putDvd = function(req, res) {
    // Use the Dvd model to find a specific dvd
    Dvd.findById(req.params.dvd_id, function(err, dvd) {
        if (err)
            res.send(err);
        // Update the existing dvd quantity
        dvd.quantity = req.body.quantity;
        // Save the dvd and check for errors
        dvd.save(function(err) {
            if (err)
                res.send(err);
            res.json(dvd);
        });
    });
};

// Create endpoint /api/dvds/:dvd_id for DELETE
exports.deleteDvd = function(req, res) {
    // Use the Dvd model to find a specific dvd and remove it
    Dvd.findByIdAndRemove(req.params.dvd_id, function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'All the copies of thid dvd are now gone from the dvd store!' });
    });
};
