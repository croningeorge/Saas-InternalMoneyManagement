const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const config = require("./config/config"); // get our config file
const response = require("./lib/common");
const ev = require("express-validation");
const fileUpload = require("express-fileupload");

// global DB Connection
global.db = require("./db/connection");

const index = require("./routes/index");
const users = require("./routes/users");
const masters = require("./routes/masters");
const transfer_fee = require("./routes/transfer_fee");
const settings = require("./routes/settings");
const mobile = require("./routes/mobile");
const cors = require("./middlewares/cors");

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(compression());
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

app.set("baseURL", config.baseUrl); // baseUrl variable
app.set("viewTimeFormat", config.viewTimeFormat); //
app.set("dbTimeFormat", config.dbTimeFormat); //
app.set("tokenSecret", config.secret); // secret variable
app.set("expiresInMinutes", config.expiresInMinutes); // expiresInMinutes
app.set("expiresInSecondsMobile", config.expiresInSecondsMobile); // expiresInMinutes for mobile api calls
app.set("resetPasswordUrl", config.resetPasswordUrl); // resetPasswordUrl variable
app.set("authUrl", config.authUrl); //magento api auth url
app.set("rootPath", __dirname); // kycFilePath variable
app.set("publicPath", __dirname + "/public"); // Public variable
app.set("kycFilePath", config.kycFilePath); // kycFilePath variable

if (app.get("env") === "development") {
  // Add headers
  app.use(cors.cors);
}

/* Include routes */
app.use("/api", index);

//users routes
app.use("/api/users", users);

// master routes
app.use("/api/masters", masters);

// transfer fee
app.use("/api/transfer_fee", transfer_fee);

// mobile routes
app.use("/api/mobile", mobile);

// settings
app.use("/api/settings", settings);
/*************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // specific for validation errors
  if (err instanceof ev.ValidationError) {
    return response.error(
      res,
      err,
      err.message || "Validation error",
      err.status || 500
    );
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
