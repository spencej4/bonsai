const express= require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User =  require('./models/user.js');
const Products = require('./models/products.js')
// ==================================================== square:
const crypto = require('crypto');
const squareConnect = require('square-connect');
const dotenv = require('dotenv');
dotenv.config();
// Set the Access Token
const accessToken = process.env.ACCESS_TOKEN

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static(__dirname));

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;
// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';
// ================================================== end square 


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


// ==================================================== square:
router.post('/process-payment', async (req, res) => {
  const request_params = req.body;
  const amount = parseInt(request_params.amount);
  console.log(`Request Amount variable within API: ${request_params.amount}`);
  console.log(`Request Amount Number within API: ${amount}`);

  // this is now seen, added .env to server parent folder
  // console.log(oauth2.accessToken);

  // length of idempotency_key should be less than 45
  const idempotency_key = crypto.randomBytes(22).toString('hex');

  // Charge the customer's card
  const payments_api = new squareConnect.PaymentsApi();
  const request_body = {
    source_id: request_params.nonce,
    amount_money: {
      amount: request_params.amount * 100, // £1.00 charge
      currency: 'USD'
    },
    idempotency_key: idempotency_key
  };

  try {
    const response = await payments_api.createPayment(request_body);
    res.status(200).json({
      'title': 'Payment Successful',
      'result': response
    });
  } catch(error) {
    res.status(500).json({
      'title': 'Payment Failure',
      'result': error.response.text
    });
  }
});
// ================================================== end square 

// POST request - admin adds product to store
router.post('/add-product', async (request, response, next) => {
  Products.add_product(request.body.new_product_name, request.body.new_product_price,
    request.body.new_product_description, request.body.new_product_image_url, 
    function (error, product) {
      if (error || !product) {
        var err = new Error('Error adding new product');
        err.status = 401;
        return next(err)
      } else {
        let body = product.product
        return response.json(body);
      }
  });
})

module.exports = router;