const express= require('express');
const router = express.Router();
const User =  require('./models/user.js');
const Products = require('./models/products.js')

//POST request for user registration
router.post('/register', function(request, response){
      var u = new User({
        email: request.body.email,
        password: request.body.password,
    });

    u.save(function(err, user) {
        if (err)
          throw err;
        else 
          // added this here
          // request.session.userId = user._id;
          console.log('saved user successfully...');
    });
    
    response.json({msg: response.body});
});


// POST request for user login
router.post('/login', function(request, response, next){
  // console.log(`Email: ${request.body.email}   (from: api)`);
  // console.log(`Password: ${request.body.password}   (from: api)`);

   User.authenticate(request.body.email, request.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err)
      } else {
        console.log(`User ID: ${user._id} is authenticated  (from: api)`);
        let body = user.id;
        return response.json(body);
      }
    });
});


// GET request to console log list of users in mongod terminal
router.get('/users', function (request, response) {
  User.findAll();
})

// GET request to console log list of products in mongod terminal
// ...works
// router.get('/products', function (request, response) {
//   Products.findAll();
// })

router.get('/products/:query', function (request, response) {
  let query = request.params.query

  Products.findAll(query, function(error, query){
    if (error) {
      var error = new Error("Error");
      err.status = 404;
    } else {
      response.json(query)
      return response
    }
  });
})

module.exports = router;