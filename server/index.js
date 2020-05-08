const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

var session = require('express-session');
var cookieParser = require('cookie-parser')

const app = express();
app.set('port', (process.env.PORT || 4000));
app.use(cors());

//this is our MongoDB database
const dbRoute = "mongodb://Admin:Level_2020@ds255332.mlab.com:55332/heroku_f3scbbgf";

//connects our back end code with the database
mongoose.connect(
    dbRoute, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
);

// checks if connection with the database is successful
let db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to Mongo Database");
})

//use sessions for tracking logins
app.use(cookieParser('secret'));

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', require('./api'));

//init app
//build part of the react app
app.use('/', express.static(path.join(__dirname, '../build')));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

//err
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send(err.message);
});

// testing 04/20/20
app.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});
// end testing 04/20/20

//port
app.listen(app.get('port'), function () {
    console.log('App listening on port ' + app.get('port'));
});