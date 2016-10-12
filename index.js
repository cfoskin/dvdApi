// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');
//database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:/dvdStoreDb');

//controllers
var dvdController = require('./controllers/dvd');
var customerController = require('./controllers/customer');

var app = express();
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;
// Create our Express router
var router = express.Router();

// Initial route for testing
router.get('/', function(req, res) {
    res.json({ message: 'The dvd store is running out of dvds!' });
});

router.route('/dvds')
  .post(dvdController.postDvds)
  .get(dvdController.getDvds);

router.route('/dvds/:dvd_id')
  .get(dvdController.getDvd)
  .put(dvdController.putDvd)
  .delete(dvdController.deleteDvd);

router.route('/customers')
  .post(customerController.postCustomers)
  .get(customerController.getCustomers);

router.route('/customers/:cust_id')
  .get(customerController.getCustomer)
  .put(customerController.putCustomer)
  .delete(customerController.deleteCustomer);

// Register all our routes with /api
app.use('/api', router);
app.listen(port);

