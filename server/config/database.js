// Connect to MongoDB.

// import Mongoose
import mongoose from 'mongoose';

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var url = 'mongodb://heroku_dnj4cthq:ak6jhpah5q0ucdcfvrdtcg9q8f@ds157247.mlab.com:57247/heroku_dnj4cthq' || 'mongodb://localhost:27017/local';
mongoose.connect(url);
// var theport = process.env.PORT || 5000;
mongoose.Promise = require('bluebird');

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + url);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
