/**
 *  File to include all request schema.
 */

var create_user_type = require("./create_user_type.js");
var update_user_type = require("./update_user_type.js");
var remove_user_type = require("./remove_user_type.js");
var create_kyc_doc_type = require("./create_kyc_doc_type.js");
var update_kyc_doc_type = require("./update_kyc_doc_type.js");
var remove_kyc_doc_type = require("./remove_kyc_doc_type.js");
var create_kyc_doc = require("./create_kyc_doc.js");
var update_kyc_doc = require("./update_kyc_doc.js");
var remove_kyc_doc = require("./remove_kyc_doc.js");
var create_country = require("./create_country.js");
var update_country = require("./update_country.js");
var remove_country = require("./remove_country.js");
var create_currency = require("./create_currency.js");
var update_currency = require("./update_currency.js");
var remove_currency = require("./remove_currency.js");
var create_outlet = require("./create_outlet.js");
var update_outlet = require("./update_outlet.js");
var remove_outlet = require("./remove_outlet.js");
var create_payment_method = require("./create_payment_method.js");
var update_payment_method = require("./update_payment_method.js");
var remove_payment_method = require("./remove_payment_method.js");
var create_fund_remark = require("./create_fund_remark.js");
var update_fund_remark = require("./update_fund_remark.js");
var remove_fund_remark = require("./remove_fund_remark.js");

module.exports = {
  // user type
  create_user_type: create_user_type,
  update_user_type: update_user_type,
  remove_user_type: remove_user_type,
  // kyc doc type
  create_kyc_doc_type: create_kyc_doc_type,
  update_kyc_doc_type: update_kyc_doc_type,
  remove_kyc_doc_type: remove_kyc_doc_type,
  //kyc doc
  create_kyc_doc: create_kyc_doc,
  update_kyc_doc: update_kyc_doc,
  remove_kyc_doc: remove_kyc_doc,
  //country
  create_country: create_country,
  update_country: update_country,
  remove_country: remove_country,
  //currency
  create_currency: create_currency,
  update_currency: update_currency,
  remove_currency: remove_currency,
  //outlet
  create_outlet: create_outlet,
  update_outlet: update_outlet,
  remove_outlet: remove_outlet,
  //payment method
  create_payment_method: create_payment_method,
  update_payment_method: update_payment_method,
  remove_payment_method: remove_payment_method,
  //fund remark
  create_fund_remark: create_fund_remark,
  update_fund_remark: update_fund_remark,
  remove_fund_remark: remove_fund_remark
};
