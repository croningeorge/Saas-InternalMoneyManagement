/**
 *  create kyc doc request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().required(),
  kyc_document_type_id: Joi.number().required(),
  is_primary: Joi.boolean().required()
});

module.exports = {
  body: schema
};
