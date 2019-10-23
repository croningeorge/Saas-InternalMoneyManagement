/**
 *  remove country request schema
 */

const Joi = require("joi");

const schema = Joi.object().keys({
  id: Joi.number().required()
});

module.exports = {
  body: schema
};
