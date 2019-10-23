/**
 * This file contains all the routes of masters module
 */

const express = require("express");
const router = express.Router();
const validate = require("express-validation");

const auth = require("../../middlewares/auth");
const acl = require("../../middlewares/acl");
// Include all the request schemas
const validation = require("./requests/index");
// Include all user type  callback functions
const masters = require("./index");

/**
 * list/detail user type
 * @param String status <1/0/all>
 * @param int id
 * @return array of user type objects
 */

router.get(
  "/user_type/:status?/:id?",
  [auth.auth, acl.verify],
  masters.listUserTypes
);

/**
 * create user type
 * @param String name
 * @return json
 */
router.post(
  "/user_type/create",
  [auth.auth, acl.verify, validate(validation.create_user_type)],
  masters.createUserType
);

/**
 * update user type
 * @param String name
 * @param int status <1/0>
 * @param int id
 * @return json
 */
router.post(
  "/user_type/update",
  [auth.auth, acl.verify, validate(validation.update_user_type)],
  masters.updateUserType
);

/**
 * remove user type
 * @param int id
 * @return json
 */
router.post(
  "/user_type/remove",
  [auth.auth, acl.verify, validate(validation.remove_user_type)],
  masters.removeUserType
);

/**
 * list/detail kyc documents
 * @param int id
 * @return array of user type objects
 */

router.get("/kyc_doc_type/:id?", [auth.auth, acl.verify], masters.kycDocTypes);

/**
 * create kyc doc type
 * @param String name
 * @param int required_sec_doc
 * @param String description
 * @return json
 */
router.post(
  "/kyc_doc_type",
  [auth.auth, acl.verify, validate(validation.create_kyc_doc_type)],
  masters.createKycDocTypes
);

/**
 * update kyc doc type
 * @param int id
 * @param String name
 * @param int required_sec_doc
 * @param String description
 * @return json
 */
router.post(
  "/kyc_doc_type/update",
  [auth.auth, acl.verify, validate(validation.update_kyc_doc_type)],
  masters.updateKycDocTypes
);

/**
 * remove kyc doc type
 * @param int id
 * @return json
 */
router.post(
  "/kyc_doc_type/remove",
  [auth.auth, acl.verify, validate(validation.remove_kyc_doc_type)],
  masters.removeKycDocType
);

/**
 * list/detail kyc documents
 * @param int id
 * @return array of user type objects
 */

router.get("/kyc_docs/:id?", [auth.auth, acl.verify], masters.kycDocs);

/**
 * create kyc doc
 * @param String name
 * @param int kyc_document_type_id
 * @param Bool is_primary
 * @return json
 */
router.post(
  "/kyc_doc",
  [auth.auth, acl.verify, validate(validation.create_kyc_doc)],
  masters.createKycDoc
);

/**
 * update kyc doc
 * @param int id
 * @param String name
 * @param int kyc_document_type_id
 * @param Bool is_primary
 * @return json
 */
router.post(
  "/kyc_doc/update",
  [auth.auth, acl.verify, validate(validation.update_kyc_doc)],
  masters.updateKycDocs
);

/**
 * remove kyc doc
 * @param int id
 * @return json
 */
router.post(
  "/kyc_doc/remove",
  [auth.auth, acl.verify, validate(validation.remove_kyc_doc)],
  masters.removeKycDoc
);

/**
 * List/Detail countries
 * @param int id
 * @return array of user type objects
 */

router.get("/countries/:id?", [auth.auth, acl.verify], masters.getCountries);

/**
 * create country
 * @param String name
 * @param String code
 * @return json
 */
router.post(
  "/countries",
  [auth.auth, acl.verify, validate(validation.create_country)],
  masters.createCountry
);

/**
 * update country
 * @param int id
 * @param String name
 * @param String code
 * @return json
 */
router.post(
  "/country/update",
  [auth.auth, acl.verify, validate(validation.update_country)],
  masters.updateCountry
);

/**
 * remove country
 * @param int id
 * @return json
 */
router.post(
  "/country/remove",
  [auth.auth, acl.verify, validate(validation.remove_country)],
  masters.removeCountry
);

/**
 * List/Detail Currencies
 * @param int id
 * @return array of Currencies objects
 */
router.get("/currencies/:id?", [auth.auth, acl.verify], masters.getCurrencies);

/**
 * create Currency
 * @param String name
 * @param String code
 * @param int country_id
 * @return json
 */
router.post(
  "/currency",
  [auth.auth, acl.verify, validate(validation.create_currency)],
  masters.createCurrency
);

/**
 * update Currency
 * @param int id
 * @param String name
 * @param String code
 * @param int country_id
 * @return json
 */
router.post(
  "/currency/update",
  [auth.auth, acl.verify, validate(validation.update_currency)],
  masters.updateCurrency
);

/**
 * remove Currency
 * @param int id
 * @return json
 */
router.post(
  "/currency/remove",
  [auth.auth, acl.verify, validate(validation.remove_currency)],
  masters.removeCurrency
);

/**
 * List/Detail Outlets
 * @param int id
 * @return array of outlets objects
 */
router.get("/outlets/:id?", [auth.auth, acl.verify], masters.getOutlets);

/**
 * create Outlets
 * @param String name
 * @param String address
 * @param int country_id
 * @param int lat
 * @param int lang
 * @return json
 */
router.post(
  "/outlet",
  [auth.auth, acl.verify, validate(validation.create_outlet)],
  masters.createOutlet
);

/**
 * update Oulet
 * @param int id
 * @param String name
 * @param String address
 * @param int country_id
 * @param int lat
 * @param int lang
 * @return json
 */
router.post(
  "/outlet/update",
  [auth.auth, acl.verify, validate(validation.update_outlet)],
  masters.updateOutlet
);

/**
 * remove Oulet
 * @param int id
 * @return json
 */
router.post(
  "/outlet/remove",
  [auth.auth, acl.verify, validate(validation.remove_outlet)],
  masters.removeOulet
);

/**
 * List/Detail Payment Methods
 * @param int id
 * @return array of Payment Methods objects
 */
router.get(
  "/payment_methods/:id?",
  [auth.auth, acl.verify],
  masters.getPaymentMethods
);

/**
 * create Payment method
 * @param String name
 * @return json
 */
router.post(
  "/payment_method",
  [auth.auth, acl.verify, validate(validation.create_payment_method)],
  masters.createPaymentMethod
);

/**
 * update payment method
 * @param int id
 * @param String name
 * @return json
 */
router.post(
  "/payment_method/update",
  [auth.auth, acl.verify, validate(validation.update_payment_method)],
  masters.updatePaymentMethod
);

/**
 * remove payment method
 * @param int id
 * @return json
 */
router.post(
  "/payment_method/remove",
  [auth.auth, acl.verify, validate(validation.remove_payment_method)],
  masters.removePaymentMethod
);

/**
 * List/Detail Fund remarks
 * @param int id
 * @return array of outlets objects
 */
router.get(
  "/fund_remarks/:id?",
  [auth.auth, acl.verify],
  masters.getFundRemarks
);

/**
 * create Fund remarks
 * @param String name
 * @param bool is_purpose
 * @return json
 */
router.post(
  "/fund_remark",
  [auth.auth, acl.verify, validate(validation.create_fund_remark)],
  masters.createFundRemark
);

/**
 * update Fund remarks
 * @param int id
 * @param String name
 * @param bool is_purpose
 * @return json
 */
router.post(
  "/fund_remark/update",
  [auth.auth, acl.verify, validate(validation.update_fund_remark)],
  masters.updateFundRemark
);

/**
 * remove Fund remarks
 * @param int id
 * @return json
 */
router.post(
  "/fund_remark/remove",
  [auth.auth, acl.verify, validate(validation.remove_fund_remark)],
  masters.removeFundRemark
);

//
// router.get("/test", [auth.auth, acl.verify], callbackFunction);

module.exports = router;
