const mysql = require("mysql2/promise");

async function connectToDB() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.SERVER_PASSWORD,
      database: "events",
    });

    console.log("Connected");

    return connection;
  } catch (err) {
    throw err;
  }
}

const connection = connectToDB();

module.exports = connection;
