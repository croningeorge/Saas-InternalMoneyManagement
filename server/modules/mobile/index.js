/**
 * This file holds all the functions of mobile api request
 */

// Require the mobile.js file
var mobile = require("./mobile");

// Exports the function from mobile
module.exports = {
  dashboardDetails: mobile.dashboardDetails,
  getKycDetails: mobile.getKycDetails,
  kycStatus: mobile.kycStatus,
  saveKycDocs: mobile.saveKycDocs,
  getContacts: mobile.getContacts,
  updateUser: mobile.updateUser // for testing
};
