/**
 *  update fund remark request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  is_purpose: Joi.boolean().required()
});

module.exports = {
  body: schema
};
