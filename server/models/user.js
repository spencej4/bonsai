var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }, 
  content: [{
    // full image url
    image: String,
    // thumbnail image url
    smallImage: String,
    // image ID from unsplash, grabbed from hovering on image
    imageID: String
  }]
});


//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          // console.log(`Hello there User   (from: schema)`);
          // console.log(`User ID: ${user._id}   (from: schema)`);
          return callback(null, user);
        } else {
          return callback("this user could not be authenticated");
          // return callback(user._id);
        }
      })
    });
}

// retrieve content for a given user
UserSchema.statics.getUserContent = function (email, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
          return callback(err)
      } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
      } else {
          return callback( null, user )
      }
  })
}


// add an image to database
// need to update this to delete ALL instances of documents matching an image within the db
// otherwise you get an image placeholder when on user collection
UserSchema.statics.add_image = function (email, image, smallImage, imageID, callback) {
  User.findOneAndUpdate(
    { "email": email },
    {"$push": { "content": { image, smallImage, imageID }}},
    { upsert: true, new: true  }, 
    function(res, doc) {
        let imageID = doc.content[doc.content.length-1].imageID;
        console.log(`user added image: ${imageID} (UserSchema)`);
        return callback(null, imageID);
    }
  );
}


// delete image from database
UserSchema.statics.delete_image = function (email, imageID, callback) {
  User.update(
    { email: email},
    { $pull: { content: { imageID: imageID }} },
    { new: true },
    function(err, response, doc) {
      console.log(`user deleted image: ${imageID} (UserSchema)`);
      return callback(null, imageID);
    }
  )
}


// get list of all users in database
UserSchema.statics.findAll = function (request, response) {
  User.find({}, function(err, users) {
    var userMap = {};
  
    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    
    console.log(userMap)
    // response.send(userMap);  
  });
}


//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);

module.exports = User;