// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to the dvdStore MongoDB
mongoose.connect('mongodb://localhost:/dvdStoreDb');
var Dvd = require('./models/dvd');

// Create our Express application
var app = express();
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
    res.json({ message: 'You are running out of dvds!' });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Add dvd on port ' + port);


// Create a new route with the prefix /dvds
var dvdsRoute = router.route('/dvds');

// Create endpoint /api/dvds for POSTS
dvdsRoute.post(function(req, res) {
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
});


// Create endpoint /api/dvds for GET
dvdsRoute.get(function(req, res) {
    // Use the Dvd model to find all dvd
    Dvd.find(function(err, dvds) {
        if (err)
            res.send(err);

        res.json(dvds);
    });
});

// Create a new route with the /dvds/:dvd_id prefix
var dvdRoute = router.route('/dvds/:dvd_id');

// Create endpoint /api/dvds/:dvd_id for GET
dvdRoute.get(function(req, res) {
    // Use the Dvd model to find a specific dvd
    Dvd.findById(req.params.dvd_id, function(err, dvd) {
        if (err)
            res.send(err);
        res.json(dvd);
    });
});


// Create endpoint /api/dvds/:dvd_id for PUT
dvdRoute.put(function(req, res) {
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
});


// Create endpoint /api/dvds/:dvd_id for DELETE
dvdRoute.delete(function(req, res) {
  // Use the Dvd model to find a specific dvd and remove it
  Dvd.findByIdAndRemove(req.params.dvd_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'All the copies of thid dvd are now gone from the dvd store!' });
  });
});
