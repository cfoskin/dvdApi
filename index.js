// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');

var passport = require('passport');
//database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/dvdStoreDb');

//controllers
var dvdController = require('./controllers/dvd');
var userController = require('./controllers/user');
var oauth2Controller = require('./controllers/oauth2');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');

var session = require('express-session');
var ejs = require('ejs');
var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
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

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/users/:user_id')
  .get(authController.isAuthenticated, userController.getUser)
  .put(authController.isAuthenticated, userController.putUser)
  .delete(authController.isAuthenticated, userController.deleteUser);
  
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);
// Register all our routes with /api
app.use('/api', router);
app.listen(port);

