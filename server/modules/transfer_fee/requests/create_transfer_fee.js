/**
 *  create transfer fee request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().required(),
  transfer_fee_type: Joi.number().required(),
  amount: Joi.number()
    .precision(2)
    .required(),
  payment_method_id: Joi.number(),
  outlet_id: Joi.number()
});

module.exports = {
  body: schema
};
