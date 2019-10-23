/**
 * This file contains all the routes of mobile module
 */
const express = require("express");
const router = express.Router();
const validate = require("express-validation");
//to verify the magento token
const token = require("../../middlewares/token");

// Include all the request schemas
const validation = require("./requests/index");
// Include all mobile callback functions
const mobile = require("./index");
// Include all masters callback functions
const masters = require("../masters/index");

//to get the dashboard details
router.get("/dashboard", [token.verify], mobile.dashboardDetails);

//to get the kyc types and sub types
router.get("/kyc-types", [token.verify], masters.kycDocTypes);

//to get users active kyc details
router.get("/kyc-details", [token.verify], mobile.getKycDetails);
// save kyc doc
router.post("/save-kyc", [token.verify], mobile.saveKycDocs);
// List active locations(outlets)
router.get("/outlets", [token.verify], masters.getOutlets);

router.post(
  "/contacts",
  [token.verify, validate(validation.get_contacts)],
  mobile.getContacts
); //get_contacts

router.post("/change-status", [token.verify], mobile.updateUser); //get_contacts

// Exports all the mobile route
module.exports = router;
