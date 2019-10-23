/**
 *  save kyc docs request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  document_type_id: Joi.number().required(),
  kyc_doc: Joi.required(),
  is_primary: Joi.boolean().required(),
  prev_id: Joi.number()
});

module.exports = {
  body: schema
};
