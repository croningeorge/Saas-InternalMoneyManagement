/**
 *  update kyc doc type request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  required_sec_doc: Joi.number().required(),
  description: Joi.string()
});

module.exports = {
  body: schema
};
