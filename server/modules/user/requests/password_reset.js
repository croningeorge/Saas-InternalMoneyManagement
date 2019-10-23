/**
 *  password reset request schema
 */
const Joi = require("joi");

const schema = Joi.object().keys({
  new_password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  token: Joi.string().required()
});

module.exports = {
  body: schema
};
