/**
 * This file contains all the routes of transfer fee module
 */

const express = require("express");
const router = express.Router();
const validate = require("express-validation");

const auth = require("../../middlewares/auth");
const acl = require("../../middlewares/acl");
// Include all the request schemas
const validation = require("./requests/index");
// Include all transfer fees  callback functions
const transfer_fees = require("./index");

/**
 * create a transfer fee
 * @param String name
 * @param int transfer_fee_type
 * @param number amount
 * @param int payment_method_id
 * @param int outlet_id
 * @return json
 */
router.post(
  "/create",
  [auth.auth, acl.verify, validate(validation.create_transfer_fee)],
  transfer_fees.createTransferFee
);

/**
 * list/detail Transfer Fee
 * @param int id
 * @return array of Transfer Fee objects
 */
router.get("/:id?", [auth.auth, acl.verify], transfer_fees.getTransferFee);

module.exports = router;
