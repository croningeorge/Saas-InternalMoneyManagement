/**
 *  update user type request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().required(),
  id: Joi.number().required(),
  status: Joi.number().required()
});

module.exports = {
  body: schema
};
