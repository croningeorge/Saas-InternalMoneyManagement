/**
 * This file holds all the functions of user module
 */

// Require the user.js file
var user = require("./user");

// Exports the function from user
module.exports = {
  test: user.test,
  authenticate: user.login,
  forgetpassword: user.forgetpassword,
  list: user.list,
  userDetails: user.userDetails,
  create: user.create,
  verifytoken: user.verify_token,
  passwordreset: user.password_reset,
  updateUserStatus: user.updateUserStatus
};
