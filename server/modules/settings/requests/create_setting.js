/**
 *  create setting request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  config_name: Joi.string().required(),
  config_value: Joi.string().required()
});

module.exports = {
  body: schema
};
