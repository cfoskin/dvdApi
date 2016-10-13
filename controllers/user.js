var User = require('../models/user');
// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });
  user.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'New user been created!' });
  });
};

// Create endpoint /api/users/:user_id for GET
exports.getUser = function(req, res) {
    // Use the Dvd model to find a specific user
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
};

// Create endpoint /api/users/:user_id for PUT
exports.putUser = function(req, res) {
    // Use the user model to find a specific user
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        // Save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });
};

// Create endpoint /api/users/:user_id for DELETE
exports.deleteUser = function(req, res) {
    // Use the user model to find a specific user and remove it
    User.findByIdAndRemove(req.params.user_id, function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'User account is now removed from the dvd store!' });
    });
};

