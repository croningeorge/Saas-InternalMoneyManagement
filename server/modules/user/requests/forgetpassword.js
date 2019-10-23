/**
 *  forgetpassword request schema
 */
const Joi = require("joi");

const schema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
});

module.exports = {
  body: schema
};
