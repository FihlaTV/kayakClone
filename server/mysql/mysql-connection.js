var server = require('../app');
var mysql = require('mysql');

// DB CONNECTION
//Put your mysql configuration settings - user, password, database and port
function getConnection() {
  var connection = mysql.createPool({
    //details
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kayak',
    port: 3306
  });
  console.log('connected');
  return connection;
}

exports.getConnection = getConnection;
