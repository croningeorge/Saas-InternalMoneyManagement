/**
 * This file contains all the routes of settings module
 */

const express = require("express");
const router = express.Router();
const validate = require("express-validation");

const auth = require("../../middlewares/auth");
const acl = require("../../middlewares/acl");
// Include all the request schemas
const validation = require("./requests/index");
// Include all settings  callback functions
const settings = require("./index");

/**
 * create a new configuration
 * @param String config_name
 * @param String config_value
 * @return json
 */
router.post(
  "/create",
  [auth.auth, acl.verify, validate(validation.create_setting)],
  settings.createSetting
);

/**
 * remove a config
 * @param String config_name
 * @return json
 */
router.post(
  "/remove",
  [auth.auth, acl.verify, validate(validation.remove_setting)],
  settings.removeSetting
);

/**
 * get a config
 * @param String config_name
 * @return json
 */
router.post(
  "/get",
  [auth.auth, acl.verify, validate(validation.get_setting)],
  settings.getSetting
);

module.exports = router;
