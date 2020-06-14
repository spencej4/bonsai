var mongoose = require('mongoose');

var OrdersSchema = new mongoose.Schema({
    _id: Number,
    temp: String,
    orders: [{
        email: String,
        firstName: String,
        lastName: String,
        streetAddress: String,
        aptOrUnitNumber: String, 
        city: String,
        state: String,
        zipcode: Number,
        cart: Array
      }]
});


OrdersSchema.statics.save_new_order = function (email, firstName, lastName, streetAddress, aptOrUnitNumber, city, state, zipcode, cart, callback) {
  Orders.findOneAndUpdate(
    { "temp": "testing"},
    {"$push": {"orders": {
        email: email,
        firstName: firstName,
        lastName: lastName,
        streetAddress: streetAddress,
        aptOrUnitNumber: aptOrUnitNumber, 
        city: city,
        state: state,
        zipcode: zipcode,
        cart, cart
    }}},
    {upsert: true, new: true },
    function(res, doc) {
        let newOrder_confirmation_id = doc.orders[doc.orders.length-1]._id;
        console.log('==============================================================')
        console.log(`New Order Successfully Added: Confirmation ID: ${newOrder_confirmation_id} (UserSchema)`);
        return callback(null, newOrder_confirmation_id);
    }
  )
}

var Orders = mongoose.model('Orders', OrdersSchema);
module.exports = Orders;