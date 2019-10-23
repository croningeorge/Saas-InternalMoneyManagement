/**
 * This file holds all the outlet related functionality
 */

// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

const table = "outlets";
// const country_table = "countries";
const country = require("./countries");

/**
 * List / Detail view of outlets
 * @param {*request} req
 * @param {*response} res
 * @return array of outlets
 */

async function getOutlets(req, res) {
  try {
    let id_filter = req.params.id ? "AND t1.id = $/id/" : "";
    let sql = `SELECT t1.id AS id, t1.branch_name AS name, t1.address, t1.country_id, t1.lat, t1.lang
          FROM ${table} AS t1
          WHERE t1.deleted_at IS NULL ${id_filter}`;
    const param = {
      id: req.params.id
    };
    const outlets = await db.any(sql, param);
    // success
    return response.success(res, outlets, "success");
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Create outlet
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function createOutlet(req, res) {
  const branch_name = req.body.name;
  const address = req.body.address;
  const country_id = req.body.country_id;
  const lat = req.body.lat;
  const lang = req.body.lang;
  const created_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.branch_name FROM ${table} as t1 WHERE t1.branch_name = $1 AND t1.country_id = $2 AND t1.deleted_at IS NULL`;
      const outlet = await db.any(sql, [branch_name, country_id]);
      if (outlet.length < 1) {
        // check Country exist
        const country_details = await country.getCountryById(country_id);
        if (country_details.length > 0) {
          sql = `INSERT INTO ${table}(branch_name, address, country_id, lat, lang, created_at) VALUES($/branch_name/, $/address/, $/country_id/, $/lat/, $/lang/, $/created_at/) RETURNING id`;
          const param = {
            branch_name: branch_name,
            address: address,
            country_id: country_id,
            lat: lat,
            lang: lang,
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
          { id: data.id, name: branch_name },
          "Outlet created"
        );
      } else {
        response.error(res, {}, "Outlet creation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

/**
 * Update outlet
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function updateOutlet(req, res) {
  const id = req.body.id;
  const branch_name = req.body.name;
  const address = req.body.address;
  const country_id = req.body.country_id;
  const lat = req.body.lat;
  const lang = req.body.lang;
  const updated_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.branch_name FROM ${table} as t1 WHERE t1.branch_name = $1 AND t1.country_id = $2 AND t1.deleted_at IS NULL`;
      const outlet = await db.any(sql, [branch_name, country_id]);
      if (outlet.length < 1 || outlet[0].id == id) {
        const country_details = await country.getCountryById(country_id);
        if (country_details.length > 0) {
          sql = `UPDATE ${table} 
                  SET branch_name = $/branch_name/, address = $/address/,country_id = $/country_id/, lat = $/lat/, lang = $/lang/, updated_at = $/updated_at/ 
                  WHERE id = $/id/ AND deleted_at IS NULL RETURNING id`;
          const param = {
            branch_name: branch_name,
            address: address,
            country_id: country_id,
            lat: lat,
            lang: lang,
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
          { id: data.id, name: branch_name },
          "Outlet updated"
        );
      } else {
        response.error(res, {}, "Outlet updation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      console.log(err);
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * Remove a Outlet(soft delete)
 * @param {*request} req
 * @param {*response} res
 */
async function removeOulet(req, res) {
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
      return response.success(res, { id: data.id }, "Oulet removed");
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

// exports all Outlets related callbacks
module.exports = {
  getOutlets: getOutlets,
  createOutlet: createOutlet,
  updateOutlet: updateOutlet,
  removeOulet: removeOulet
};
