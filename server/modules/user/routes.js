/**
 * This file contains all the routes of user module
 */
const express = require("express");
const router = express.Router();
const validate = require("express-validation");
const auth = require("../../middlewares/auth");
const acl = require("../../middlewares/acl");

// Include all the request schemas
const validation = require("./requests/index");
// Include all user callback functions
const users = require("./index");

/**
 * User login route
 * @param String email
 * @param String password
 * @return token with user details
 */
router.post(
  "/authenticate",
  validate(validation.authenticate),
  users.authenticate
);

//to get the single user details
router.get("/details/:userId", [auth.auth, acl.verify], users.userDetails);

/**
 * to get the users list with user status and user type  filtering
 * @param Int userTypeId
 * @param Int userStatus
 * @returns Array with users
 */
router.get("/:userTypeId?/:userStatusId?", [auth.auth, acl.verify], users.list);

//to create user
router.post(
  "/create",
  [auth.auth, acl.verify, validate(validation.create)],
  users.create
);

/**
 * User forget password route
 * @param String email
 * @return Send an email with reset link(reset token)
 */
router.post(
  "/forgetpassword",
  validate(validation.forgetpassword),
  users.forgetpassword
);

/**
 * Verify a valid token
 * @param String token
 * @return token valid or not with related user mail
 */
router.post(
  "/verify_token",
  validate(validation.verify_token),
  users.verifytoken
);

/**
 * Reset password with new password
 * @param String email
 * @param String token
 * @param String new_password
 * @return new_password will set as password and remove the reset token
 */
router.post(
  "/password/reset",
  validate(validation.password_reset),
  users.passwordreset
);

router.get("/test", [auth.auth, acl.verify], users.test);

// Exports all the user route
module.exports = router;
