const initOptions = {
  // global event notification;
  error: (error, e) => {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message || error);
    }
  }
};

const pgp = require("pg-promise")(initOptions);

// Database connection details;
const cn = {
  host: "192.168.2.155", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "mega_app",
  user: "postgres"
  // password : '123'
};
// using an invalid connection string:
const db = pgp(cn);

db
  .connect()
  .then(obj => {
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log("ERROR:", error.message || error);
  });

module.exports = db;
