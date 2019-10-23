/**
 *  File to include all request schema.
 */

const create_setting = require("./create_setting.js");
const remove_setting = require("./remove_setting.js");
const get_setting = require("./get_setting.js");

module.exports = {
  create_setting: create_setting,
  remove_setting: remove_setting,
  get_setting: get_setting
};
