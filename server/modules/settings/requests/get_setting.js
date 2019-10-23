/**
 *  get setting request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  config_name: Joi.string().required()
});

module.exports = {
  body: schema
};
