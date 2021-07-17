const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SERVER_PASSWORD,
  database: "events",
});

module.exports = connection;
