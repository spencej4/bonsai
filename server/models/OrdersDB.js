var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this will be our data base's OrdersDB data structure 
const OrdersDB = new Schema(
    {
    orders: {
       order: String
         // required: true
    }
})

module.exports = mongoose.model("orders_database", OrdersDB);