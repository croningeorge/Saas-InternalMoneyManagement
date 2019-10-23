/**
 * This file holds all the settings related functionality
 */

// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

const table = "settings";

/**
 * Create a new config/ update if exist
 * @param {*request} req
 * @param {*response} res
 */
async function createSetting(req, res) {
  const config_name = req.body.config_name;
  const config_value = req.body.config_value;
  try {
    let setting = "";
    const setting_exist = await checkSettingExist(config_name);
    if (setting_exist) {
      // Setting already exist so update
      setting = await updateSetting(
        res,
        setting_exist.id,
        config_name,
        config_value
      );
    } else {
      // New setting
      setting = await addSetting(res, config_name, config_value);
    }
    return response.success(res, setting, "success");
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 *  Add new config to DB
 * @param {*response} res
 * @param {*String} config_name
 * @param {*String} config_value
 */
async function addSetting(res, config_name, config_value) {
  try {
    const param = {
      config_name: config_name,
      config_value: config_value,
      created_at: new Date(),
      status: 1
    };
    let sql = `INSERT INTO ${table}(config_name, config_value, status, created_at) 
        VALUES($/config_name/, $/config_value/, $/status/, $/created_at/) 
        RETURNING id`;
    return await db.one(sql, param); // return insert id
  } catch (err) {
    return false;
  }
}

/**
 *  Update a setting
 * @param {*response} res
 * @param {*int} id
 * @param {*String} config_name
 * @param {*String} config_value
 */

async function updateSetting(res, id, config_name, config_value) {
  try {
    const param = {
      id: id,
      config_name: config_name,
      config_value: config_value,
      updated_at: new Date(),
      status: 1
    };
    let sql = `UPDATE ${table} 
        SET config_name = $/config_name/, config_value = $/config_value/, status = $/status/, updated_at = $/updated_at/ 
        WHERE id = $/id/ AND deleted_at IS NULL RETURNING id`;
    return await db.one(sql, param); // return insert id
  } catch (err) {
    return false;
  }
}

/**
 * remove a config
 * @param {*request} req
 * @param {*response} res
 */
async function removeSetting(req, res) {
  const config_name = req.body.config_name;
  try {
    if (await softDeleteConfig(res, config_name)) {
      return response.success(res, {}, "success");
    }
    return response.error(res, {}, "Config not found!", 404);
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Soft delete a config
 * @param {*request} req
 * @param {*response} res
 */
async function softDeleteConfig(res, config_name) {
  try {
    const param = {
      deleted_at: new Date(),
      config_name: config_name
    };
    let sql = `UPDATE ${table} SET deleted_at = $/deleted_at/ WHERE config_name = $/config_name/ RETURNING id`;
    return await db.one(sql, param);
  } catch (err) {
    return false;
  }
}

/**
 * check a config exist
 * @param {*response} res
 * @param {*String} config_name
 */
async function checkSettingExist(config_name) {
  try {
    const param = {
      config_name: config_name
    };
    let sql = `SELECT t1.id,t1.config_value FROM ${table} AS t1 WHERE t1.deleted_at IS NULL AND t1.config_name = $/config_name/ ORDER BY created_at LIMIT 1`;
    const config = await db.any(sql, param);
    return config.length < 1 ? false : config[0];
  } catch (err) {
    return false;
  }
}

/**
 * get a config
 * @param {*request} req
 * @param {*response} res
 */
async function getSetting(req, res) {
  const config_name = req.body.config_name;
  try {
    if ((setting = await checkSettingExist(config_name))) {
      return response.success(res, setting, "success");
    }
    return response.error(res, {}, "Config not found!", 404);
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

// exports all setting related callbacks
module.exports = {
  createSetting: createSetting,
  removeSetting: removeSetting,
  getSetting: getSetting,
  checkSettingExist: checkSettingExist
};
