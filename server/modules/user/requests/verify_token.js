/**
 *  verify token request schema
 */
const Joi = require("joi");

const schema = Joi.object().keys({
  token: Joi.string().required()
});

module.exports = {
  body: schema
};
