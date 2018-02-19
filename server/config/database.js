/**
 *
 * Database Config
 * Examples:
 */


//  MongoDB
import mongoose from 'mongoose';
import env from './env';
const dbHost = {
    dev: env.dev,
    production: env.production
};
mongoose.connect(dbHost[env.MONGODB_URI]);
mongoose.Promise = require('bluebird');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
