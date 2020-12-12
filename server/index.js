const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var sslRedirect = require('heroku-ssl-redirect');
const app = express();
// forces ssl redirect using plugin
app.use(sslRedirect());

app.set('port', (process.env.PORT || 4000));
app.use(cors());

// updates deprecation, eliminates server side error message in terminal console
mongoose.set('useCreateIndex', true);

//original mLab MongoDB database
// const dbRoute = "mongodb://Admin:Level_2020@ds255332.mlab.com:55332/heroku_f3scbbgf";


// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:_boss_b_ambs@cluster0.tbkve.mongodb.net/mendiola-farms?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// original
//connects our back end code with the database
// mongoose.connect(
//     uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true 
//     },
// );

mongoose.connect(
    uri, { useNewUrlParser: true, 
        useUnifiedTopology: true, 
        // useFindAndModify: false
    })
    .then(() => console.log("Database Connected Successfully...(new mongoose connection)"))
    .catch(err => console.log(err));

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

app.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://localhost");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});


//port
app.listen(app.get('port'), function () {
    console.log('App listening on port ' + app.get('port'));
});


// 12/12/20
// testing connecting to atlas via shell
// mongo "mongodb+srv://cluster0.tbkve.mongodb.net/mendiola-farms" --username admin
