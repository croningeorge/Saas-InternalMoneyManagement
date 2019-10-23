/**
 *  File to include all request schema.
 */

var authenticate = require("./authenticate.js");
var forgetpassword = require("./forgetpassword.js");
var verify_token = require("./verify_token.js");
var password_reset = require("./password_reset.js");
const create = require("./create.js");

module.exports = {
  authenticate: authenticate,
  forgetpassword: forgetpassword,
  create: create,
  verify_token: verify_token,
  password_reset: password_reset
};
