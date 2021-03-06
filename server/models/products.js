var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var ProductSchema = new mongoose.Schema({
    _id: Number,
    temp: String,
    products: [{
      // product name 
      product: String,
      // product price
      price: Number,
      description: String,
      image: String
    }]
});


// get list of all products in database
ProductSchema.statics.findAll = function (products, callback) {
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
}

// add a product to database
ProductSchema.statics.add_product = function(product, price, description, image, callback) {
  Products.findOneAndUpdate(
    { "temp": "testing"},      
    {"$push": {"products": { product, price, description, image }}},
    {upsert: true, new: true },
    function(res, doc) {
      let newProduct = doc.products[doc.products.length-1].product
      console.log(`Added new product: ${newProduct} (ProductSchema)`)
      return callback(null, newProduct)
    }
  )
}

// delete a product from database
ProductSchema.statics.delete_product = function (productID, callback) {
  Products.updateOne(
    { "temp": "testing"},
    { $pull: {products: {_id: productID } }},
    { new: true },
    function(err, response, doc) {
      console.log(`admin deleted product: ${productID} (ProductSchema)`);
      return callback(null, productID);
    }
  )
}

  
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



var Products = mongoose.model('Products', ProductSchema);

module.exports = Products;