var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    // product name 
    product: String,
    // product price
    price: Number,
    description: String,
    image: String
});


// get list of all products in database
ProductSchema.statics.findAll = function (products, callback) {
  let temp = products;

   Products.find({})
    .exec(function (err, products) {
      // if (err) {
      //     return callback(err)
      // } else if (!products) {
      //     var err = new Error('Products not found.');
      //     err.status = 401;
      //     return callback(err);
      // } else {
          return callback( null, products )
      // }
  })

  // this one works in terminal...
  // Products.find({}, function(err, products) {
  //   var productMap = {};
  
  //   products.forEach(function(product) {
  //     productMap[product] = product;
  //   });
    
  //   console.log(productMap)
  //   // response.send(productMap);  
  //   return callback( null, productMap )
  // });
}


var Products = mongoose.model('Products', ProductSchema);

module.exports = Products;