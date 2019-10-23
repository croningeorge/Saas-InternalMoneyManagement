/**
 * This file holds all the fund remarks related functionality
 */

// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

const table = "fund_remarks";

/**
 * List / Detail view of fund remarks
 * @param {*request} req
 * @param {*response} res
 * @return array of fund remarks
 */

async function getFundRemarks(req, res) {
  try {
    let id_filter = req.params.id ? "AND t1.id = $/id/" : "";
    let sql = `SELECT t1.id AS id, t1.name AS name, t1.is_purpose
      FROM ${table} AS t1
      WHERE t1.deleted_at IS NULL ${id_filter}`;
    const param = {
      id: req.params.id
    };
    const fund_remarks = await db.any(sql, param);
    // success
    return response.success(res, fund_remarks, "success");
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Create Fund remark
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function createFundRemark(req, res) {
  const name = req.body.name;
  const is_purpose = req.body.is_purpose;
  const created_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.name FROM ${table} as t1 WHERE t1.name = $1 AND t1.is_purpose = $2 AND t1.deleted_at IS NULL`;
      const fund_remark = await db.any(sql, [name, is_purpose]);
      if (fund_remark.length < 1) {
        sql = `INSERT INTO ${table}(name, is_purpose, created_at) VALUES($/name/, $/is_purpose/, $/created_at/) RETURNING id`;
        const param = {
          name: name,
          is_purpose: is_purpose,
          created_at: created_at
        };
        return await db.one(sql, param); // return insert id
      }
      return false;
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "Fund remark created"
        );
      } else {
        response.error(res, {}, "Fund remark creation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

/**
 * Update fund remark
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function updateFundRemark(req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const is_purpose = req.body.is_purpose;
  const updated_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.name, t1.id FROM ${table} as t1 WHERE t1.name = $1 AND t1.is_purpose = $2 AND t1.deleted_at IS NULL`;
      const fund_remark = await db.any(sql, [name, is_purpose]);
      if (fund_remark.length < 1 || fund_remark[0].id == id) {
        sql = `UPDATE ${table} 
            SET name = $/name/, is_purpose = $/is_purpose/, updated_at = $/updated_at/ 
            WHERE id = $/id/ AND deleted_at IS NULL RETURNING id`;
        const param = {
          name: name,
          is_purpose: is_purpose,
          updated_at: updated_at,
          id: id
        };
        return await db.one(sql, param); // return id
      }
      return false;
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "Fund remark updated"
        );
      } else {
        response.error(res, {}, "Fund remark updation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * Remove a Fund Remark(soft delete)
 * @param {*request} req
 * @param {*response} res
 */
async function removeFundRemark(req, res) {
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
      return response.success(res, { id: data.id }, "Fund Remark removed");
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

// exports all fund remarks related callbacks
module.exports = {
  getFundRemarks: getFundRemarks,
  createFundRemark: createFundRemark,
  updateFundRemark: updateFundRemark,
  removeFundRemark: removeFundRemark
};
