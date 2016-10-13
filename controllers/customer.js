var Customer = require('../models/customer');
// Create endpoint /api/customers for POST
exports.postCustomers = function(req, res) {
  var customer = new Customer({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });
  customer.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'New customer been created!' });
  });
};

// Create endpoint /api/customers/:cust_id for GET
exports.getCustomer = function(req, res) {
    // Use the Dvd model to find a specific customer
    Customer.findById(req.params.cust_id, function(err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};

// Create endpoint /api/customers for GET
exports.getCustomers = function(req, res) {
  Customer.find(function(err, customers) {
    if (err)
      res.send(err);
    res.json(customers);
  });
};

// Create endpoint /api/customers/:cust_id for PUT
exports.putCustomer = function(req, res) {
    // Use the Customer model to find a specific customer
    Customer.findById(req.params.cust_id, function(err, customer) {
        if (err)
            res.send(err);
        // Save the customer and check for errors
        customer.save(function(err) {
            if (err)
                res.send(err);
            res.json(customer);
        });
    });
};

// Create endpoint /api/customers/:cust_id for DELETE
exports.deleteCustomer = function(req, res) {
    // Use the Customer model to find a specific customer and remove it
    Customer.findByIdAndRemove(req.params.cust_id, function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Customer account is now removed from the dvd store!' });
    });
};

