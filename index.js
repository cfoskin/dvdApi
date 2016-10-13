// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');

var passport = require('passport');
var authController = require('./controllers/authentication');
//database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/dvdStoreDb');

//controllers
var dvdController = require('./controllers/dvd');
var customerController = require('./controllers/customer');

var app = express();
// Use the body-parser package in our application
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());

// Use environment defined port or 3000
var port = process.env.PORT || 3000;
// Create our Express router
var router = express.Router();

// Initial route for testing
router.get('/', function(req, res) {
    res.json({ message: 'The dvd store is running out of dvds!' });
});

router.route('/dvds')
  .post(authController.isAuthenticated, dvdController.postDvds)
  .get(authController.isAuthenticated, dvdController.getDvds);

router.route('/dvds/:dvd_id')
  .get(authController.isAuthenticated, dvdController.getDvd)
  .put(authController.isAuthenticated, dvdController.putDvd)
  .delete(authController.isAuthenticated, dvdController.deleteDvd);

router.route('/customers')
  .post(customerController.postCustomers)
  .get( customerController.getCustomers);

router.route('/customers/:cust_id')
  .get(authController.isAuthenticated, customerController.getCustomer)
  .put(authController.isAuthenticated, customerController.putCustomer)
  .delete(authController.isAuthenticated, customerController.deleteCustomer);

// Register all our routes with /api
app.use('/api', router);
app.listen(port);

