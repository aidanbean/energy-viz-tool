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
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = require('bluebird');

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + process.env.MONGODB_URI);
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
