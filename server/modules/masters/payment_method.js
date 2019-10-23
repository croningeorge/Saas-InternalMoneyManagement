/**
 * This file holds all the payment methods related functionality
 */

// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

const table = "payment_methods";

/**
 * List / Detail view of payment methods
 * @param {*request} req
 * @param {*response} res
 * @return array of payment methods
 */

async function getPaymentMethods(req, res) {
  try {
    let id_filter = req.params.id ? "AND t1.id = $/id/" : "";
    let sql = `SELECT t1.id AS id, t1.method AS method
        FROM ${table} AS t1
        WHERE t1.deleted_at IS NULL ${id_filter}`;
    const param = {
      id: req.params.id
    };
    const payment_methods = await db.any(sql, param);
    // success
    return response.success(res, payment_methods, "success");
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Create payment method
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function createPaymentMethod(req, res) {
  const method = req.body.name;
  const created_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.method FROM ${table} as t1 WHERE t1.method = $1 AND t1.deleted_at IS NULL`;
      const payment_method = await db.any(sql, [method]);
      if (payment_method.length < 1) {
        sql = `INSERT INTO ${table}(method, created_at) VALUES($/method/, $/created_at/) RETURNING id`;
        const param = {
          method: method,
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
          { id: data.id, method: method },
          "Payment method created"
        );
      } else {
        response.error(res, {}, "Payment method creation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

/**
 * Update payment method
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function updatePaymentMethod(req, res) {
  const id = req.body.id;
  const method = req.body.name;
  const updated_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT t1.method, t1.id FROM ${table} as t1 WHERE t1.method = $1 AND t1.deleted_at IS NULL`;
      const payment_method = await db.any(sql, [method]);
      if (payment_method.length < 1 || payment_method[0].id == id) {
        sql = `UPDATE ${table} 
              SET method = $/method/, updated_at = $/updated_at/ 
              WHERE id = $/id/ AND deleted_at IS NULL RETURNING id`;
        const param = {
          method: method,
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
          { id: data.id, name: method },
          "Payment Method updated"
        );
      } else {
        response.error(res, {}, "Payment Method updation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * Remove a payment method(soft delete)
 * @param {*request} req
 * @param {*response} res
 */
async function removePaymentMethod(req, res) {
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
      return response.success(res, { id: data.id }, "Payment method removed");
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

// exports all payment methods related callbacks
module.exports = {
  getPaymentMethods: getPaymentMethods,
  createPaymentMethod: createPaymentMethod,
  updatePaymentMethod: updatePaymentMethod,
  removePaymentMethod: removePaymentMethod
};
