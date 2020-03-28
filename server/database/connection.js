let { Log } = require('../common/log')
let config = require('../config');
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: config.host,
    user: config.db_user,
    password: config.db_pass,
    database: config.db_name
})
global.connection = connection;
connection.connect(function(err) {
    if (err) throw err;
    Log('SUCCESS', `Database connected`)
  });