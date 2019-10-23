// user type functions
var userType = require("./user_type");
// kyc
var kycDoc = require("./kyc_doc");
//country
var countries = require("./countries");
//currencies
var currencies = require("./currency");
//outlets
var outlets = require("./outlet");
//payment methods
var payment_method = require("./payment_method");
//Fund Remarks
var fund_remark = require("./fund_remark");

module.exports = {
  listUserTypes: userType.listUserTypes,
  createUserType: userType.createUserType,
  updateUserType: userType.updateUserType,
  removeUserType: userType.removeUserType,
  // kyc documents
  kycDocTypes: kycDoc.kycDocTypes,
  createKycDocTypes: kycDoc.createKycDocTypes,
  updateKycDocTypes: kycDoc.updateKycDocTypes,
  removeKycDocType: kycDoc.removeKycDocType,
  //kycDocs
  kycDocs: kycDoc.kycDocs,
  createKycDoc: kycDoc.createKycDoc,
  updateKycDocs: kycDoc.updateKycDocs,
  removeKycDoc: kycDoc.removeKycDoc,
  //Countries
  getCountries: countries.getCountries,
  createCountry: countries.createCountry,
  updateCountry: countries.updateCountry,
  removeCountry: countries.removeCountry,
  //Currencies
  getCurrencies: currencies.getCurrencies,
  createCurrency: currencies.createCurrency,
  updateCurrency: currencies.updateCurrency,
  removeCurrency: currencies.removeCurrency,
  //outlets
  getOutlets: outlets.getOutlets,
  createOutlet: outlets.createOutlet,
  updateOutlet: outlets.updateOutlet,
  removeOulet: outlets.removeOulet,
  //Payment_methods
  getPaymentMethods: payment_method.getPaymentMethods,
  createPaymentMethod: payment_method.createPaymentMethod,
  updatePaymentMethod: payment_method.updatePaymentMethod,
  removePaymentMethod: payment_method.removePaymentMethod,
  //Fund Remarks
  getFundRemarks: fund_remark.getFundRemarks,
  createFundRemark: fund_remark.createFundRemark,
  updateFundRemark: fund_remark.updateFundRemark,
  removeFundRemark: fund_remark.removeFundRemark
};
