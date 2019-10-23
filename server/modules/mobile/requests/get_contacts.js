/**
 *  get contacts request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  numbers: Joi.array().required()
});

module.exports = {
  body: schema
};
