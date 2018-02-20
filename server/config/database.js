/**
 *
 * Database Config
 * Examples:
 */


//  MongoDB
import mongoose from 'mongoose';
import env from './env';
const dbHost = {
    dev: process.env.dev,
    production: process.env.production
};

const uri = 'mongodb://localhost/test';

// const uri = 'mongodb://heroku_dnj4cthq:ak6jhpah5q0ucdcfvrdtcg9q8f@ds157247.mlab.com:57247/heroku_dnj4cthq';

mongoose.connect(uri, function (err) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', uri);
    }
});

mongoose.Promise = require('bluebird');

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + uri);
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

/*
 * Mysql
 * import mysql from 'mysql';
 * import env from './env';
 * const settings = {
 *  dev: {
 *    host: 'xxxx',
 *    user: 'xxxx',
 *    database: 'xxxxx'
 *  },
 *  production: {
 *    host: 'xxxx',
 *    user: 'xxxx',
 *    database: 'xxxxx'
 *  }
 * };
 * const pool = mysql.createPool(settings[env.name]);
 * const getMysqlConnection = (cb) {
 *  pool.getConnection((err, connection) => {
 *    if (err) throw err;
 *    cb(connection);
 *  });
 * }
 * export default getMysqlConnection;
 */

/*
 * Or you can also use ORM:
 *
 *  - Bookshelf.js
 *  - Sequelize.js
 */
