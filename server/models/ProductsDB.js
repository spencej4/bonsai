var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this will be our database's Products data structure 
const ProductsDB = new Schema(
    {
    products: {
        product: String
        // required: true
    }
})


module.exports = mongoose.model("products_database", ProductsDB);
