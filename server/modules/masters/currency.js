/**
 * This file holds all the currencies related functionality
 */

// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

const country = require("./countries");

const table = "currencies";

/**
 * List / Detail view of currencies
 * @param {*request} req
 * @param {*response} res
 * @return array of currencies
 */

async function getCurrencies(req, res) {
  try {
    let id_filter = req.params.id ? "AND t1.id = $/id/" : "";
    let sql = `SELECT t1.id AS id, t1.currency AS name, t1.code, t1.country_id
        FROM ${table} AS t1
        WHERE t1.deleted_at IS NULL ${id_filter}`;
    const param = {
      id: req.params.id
    };
    const currencies = await db.any(sql, param);
    // success
    return response.success(res, currencies, "success");
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Create currency
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function createCurrency(req, res) {
  const name = req.body.name;
  const code = req.body.code;
  const country_id = req.body.country_id;
  const created_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.currency FROM ${table} as t1 WHERE t1.currency = $1 AND t1.deleted_at IS NULL`;
      const currency = await db.any(sql, [name]);
      if (currency.length < 1) {
        // check Country exist
        const country_details = await country.getCountryById(country_id);
        if (country_details.length > 0) {
          sql = `INSERT INTO ${table}(currency, code, country_id, created_at) VALUES($/name/, $/code/, $/country_id/, $/created_at/) RETURNING id`;
          const param = {
            name: name,
            code: code,
            country_id: country_id,
            created_at: created_at
          };
          return await db.one(sql, param); // return insert id
        }
      }
      return false;
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "Currency created"
        );
      } else {
        response.error(res, {}, "Currency creation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

/**
 * Update currency
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function updateCurrency(req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const code = req.body.code;
  const country_id = req.body.country_id;
  const updated_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.currency, t1.id FROM ${table} as t1 WHERE t1.currency = $1 AND t1.deleted_at IS NULL`;
      const currency = await db.any(sql, [name]);
      if (currency.length < 1 || currency[0].id == id) {
        const country_details = await country.getCountryById(country_id);
        if (country_details.length > 0) {
          sql = `UPDATE ${table} 
                SET currency = $/name/, code = $/code/,country_id = $/country_id/, updated_at = $/updated_at/ 
                WHERE id = $/id/ AND deleted_at IS NULL RETURNING id`;
          const param = {
            name: name,
            code: code,
            country_id: country_id,
            updated_at: updated_at,
            id: id
          };
          return await db.one(sql, param); // return id
        }
      }
      return false;
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "Currency updated"
        );
      } else {
        response.error(res, {}, "Currency updation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      console.log(err);
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * Remove a Currency(soft delete)
 * @param {*request} req
 * @param {*response} res
 */
async function removeCurrency(req, res) {
  const id = req.body.id;
  const deleted_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      let sql = `UPDATE ${table} SET deleted_at = $/deleted_at/ WHERE id = $/id/ RETURNING id`;
      const param = {
        deleted_at: deleted_at,
        id: id
      };
      return await db.one(sql, param);
    })
    .then(data => {
      return response.success(res, { id: data.id }, "Currency removed");
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

// exports all Currency related callbacks
module.exports = {
  getCurrencies: getCurrencies,
  createCurrency: createCurrency,
  updateCurrency: updateCurrency,
  removeCurrency: removeCurrency
};
