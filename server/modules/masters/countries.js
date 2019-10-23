/**
 * This file holds all the countries related functionality
 */

// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

const table = "countries";
const allow_table = "country_allows";

/**
 * List / Detail view of countries
 * @param {*request} req
 * @param {*response} res
 * @return array of countries
 */

async function getCountries(req, res) {
  try {
    let id_filter = req.params.id ? "AND t1.id = $/id/" : "";
    let sql = `SELECT t1.id AS id, t1.name AS name, t1.code,
      CASE WHEN t2.allow_from = true THEN 1 ELSE 0 END AS allow_from, 
      CASE WHEN t2.allow_to = true THEN 1 ELSE 0 END AS allow_to
      FROM ${table} AS t1
      LEFT JOIN ${allow_table} AS t2 ON t2.country_id = t1.id
      WHERE t1.deleted_at IS NULL AND t2.deleted_at IS NULL ${id_filter}`;
    const param = {
      id: req.params.id
    };
    const countries = await db.any(sql, param);
    // success
    return response.success(res, countries, "success");
  } catch (err) {
    console.log(err);
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Create country
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function createCountry(req, res) {
  const name = req.body.name;
  const code = req.body.code;
  const allow_from = req.body.allow_from;
  const allow_to = req.body.allow_to;
  const created_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.name FROM ${table} as t1 WHERE t1.name = $1 AND t1.deleted_at IS NULL`;
      const country = await db.any(sql, [name]);
      if (country.length < 1) {
        sql = `INSERT INTO ${table}(name, code, created_at) VALUES($/name/, $/code/, $/created_at/) RETURNING id`;
        const param = {
          name: name,
          code: code,
          created_at: created_at
        };
        country_id = await db.one(sql, param); // return insert id

        sql = `INSERT INTO ${allow_table}(country_id, allow_from, allow_to, status, created_at) 
        VALUES($/country_id/, $/allow_from/, $/allow_to/,$/status/, $/created_at/) RETURNING id`;
        const param_allow = {
          country_id: country_id.id,
          allow_from: allow_from,
          allow_to: allow_to,
          status: 1,
          created_at: created_at
        };
        await db.one(sql, param_allow); // return insert id
        return country_id;
      }
      return false;
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "Country created"
        );
      } else {
        response.error(res, {}, "Country creation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

/**
 * Update country
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function updateCountry(req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const code = req.body.code;
  const allow_from = req.body.allow_from;
  const allow_to = req.body.allow_to;
  const updated_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.name, t1.id FROM ${table} as t1 WHERE t1.name = $1 AND t1.deleted_at IS NULL`;
      const country = await db.any(sql, [name]);
      if (country.length < 1 || country[0].id == id) {
        sql = `UPDATE ${table} 
            SET name = $/name/, code = $/code/, updated_at = $/updated_at/ 
            WHERE id = $/id/ AND deleted_at IS NULL RETURNING id`;
        const param = {
          name: name,
          code: code,
          updated_at: updated_at,
          id: id
        };
        country_id = await db.one(sql, param); // return id

        sql = `UPDATE ${allow_table} SET allow_from = $/allow_from/, allow_to = $/allow_to/, updated_at = $/updated_at/ 
        WHERE country_id = $/country_id/ AND deleted_at IS NULL RETURNING id`;
        const param_allow = {
          country_id: country_id.id,
          allow_from: allow_from,
          allow_to: allow_to,
          updated_at: updated_at
        };
        await db.one(sql, param_allow); // return insert id
        return country_id;
      }
      return false;
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "Country updated"
        );
      } else {
        response.error(res, {}, "Country updation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * Remove a country(soft delete)
 * @param {*request} req
 * @param {*response} res
 */
async function removeCountry(req, res) {
  const id = req.body.id;
  const deleted_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      let sql = `UPDATE ${table} SET deleted_at = $/deleted_at/ WHERE id = $/id/ RETURNING id`;
      const param = {
        deleted_at: deleted_at,
        id: id
      };
      await db.one(sql, param);
      sql = `UPDATE ${allow_table} SET deleted_at = $/deleted_at/ WHERE country_id = $/id/ RETURNING id`;
      await db.one(sql, param); // return insert id
      return id;
    })
    .then(data => {
      return response.success(res, { id: data.id }, "Country removed");
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * Get Country details by id
 * @param {*int} id
 */
async function getCountryById(id) {
  try {
    const param = {
      id: id
    };
    let sql = `SELECT t1.name FROM ${table} as t1 WHERE t1.id = $/id/ AND t1.deleted_at IS NULL`;
    return await db.any(sql, param);
  } catch (err) {
    return [];
  }
}

// exports all countries related callbacks
module.exports = {
  getCountries: getCountries,
  createCountry: createCountry,
  updateCountry: updateCountry,
  removeCountry: removeCountry,
  getCountryById: getCountryById
};
