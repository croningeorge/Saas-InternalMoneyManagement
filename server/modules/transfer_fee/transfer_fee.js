/**
 * This file holds all the transfer fee related functionality
 */

// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

const table = "transfer_fees";
//transfer_fee_type : 1-payment method, 2- outlet, 3-custom

/**
 * Create transfer fee
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function createTransferFee(req, res) {
  const name = req.body.name;
  const transfer_fee_type = req.body.transfer_fee_type;
  const amount = req.body.amount;
  const payment_method_id = req.body.payment_method_id;
  const outlet_id = req.body.outlet_id;
  const status = 1;
  const created_at = new Date();
  db
    .task(async t => {
      const fee_exist = await isTransferFeeExist(
        name,
        transfer_fee_type,
        payment_method_id,
        outlet_id
      );
      if (!fee_exist) {
        let transfer_fee_type_col = "";
        let transfer_fee_type_val = "";
        let param = {
          name: name,
          transfer_fee_type: transfer_fee_type,
          amount: amount,
          payment_method_id: payment_method_id,
          outlet_id: outlet_id,
          status: status,
          created_at: created_at
        };
        // payment_method_id, outlet_id
        let is_exist = false;
        switch (transfer_fee_type) {
          case 1:
            // TO:DO : Check payment method exist
            const payment_method = await response.getModelById(
              "payment_methods",
              payment_method_id
            );
            if (payment_method.length > 0) {
              transfer_fee_type_col = `payment_method_id, `;
              transfer_fee_type_val = `$/payment_method_id/,`;
              param.payment_method_id = payment_method_id;
              is_exist = true;
            }
            // 1-payment method
            break;
          case 2:
            // TO:DO : Check oulet exist
            const outlet = await response.getModelById("outlets", outlet_id);
            if (outlet.length > 0) {
              transfer_fee_type_col = `outlet_id, `;
              transfer_fee_type_val = `$/outlet_id/,`;
              param.outlet_id = outlet_id;
              is_exist = true;
            }

            // 2- outlet
            break;
          case 3:
            transfer_fee_type_col = ``;
            transfer_fee_type_val = ``;
            is_exist = true;
            // 3-custom
            break;
          default:
        }
        if (is_exist) {
          let sql = `INSERT INTO ${table} 
                (name, transfer_fee_type, amount, ${transfer_fee_type_col}status, created_at) 
                VALUES($/name/, $/transfer_fee_type/, $/amount/, ${transfer_fee_type_val}$/status/, $/created_at/) RETURNING id`;

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
          "Transfer fee added and is active"
        );
      } else {
        response.error(res, {}, "Transfer fee creation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

/**
 * Get transfer fee list/Details
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function getTransferFee(req, res) {
  try {
    let id_filter = req.params.id ? "AND t1.id = $/id/" : "";
    let sql = `SELECT t1.id AS id, t1.name AS name, t1.transfer_fee_type, t1.amount, t1.payment_method_id, t1.outlet_id, t1.status
              FROM ${table} AS t1
              WHERE t1.deleted_at IS NULL ${id_filter}`;
    const param = {
      id: req.params.id
    };
    const transfer_fees = await db.any(sql, param);
    // success
    return response.success(res, transfer_fees, "success");
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

// TO : Do

// Transfer fee update

// Transfer fee remove

/**
 * Check for same transfer fee exist
 * @param {*string} name
 * @param {*number} transfer_fee_type
 * @param {*number} payment_method_id
 * @param {*number} outlet_id
 * @return json
 */

async function isTransferFeeExist(
  name,
  transfer_fee_type,
  payment_method_id,
  outlet_id
) {
  try {
    const param = {
      name: name,
      transfer_fee_type: transfer_fee_type,
      payment_method_id: payment_method_id,
      outlet_id: outlet_id
    };
    let transfer_fee_type_filter = "";
    switch (transfer_fee_type) {
      case 1:
        transfer_fee_type_filter = `AND t1.payment_method_id = $/payment_method_id/`;
        // 1-payment method
        break;
      case 2:
        transfer_fee_type_filter = `AND t1.outlet_id = $/outlet_id/`;
        // 2- outlet
        break;
      case 3:
        transfer_fee_type_filter = `AND t1.name = $/name/ AND t1.transfer_fee_type = $/transfer_fee_type/`;
        // 3-custom
        break;
      default:
    }
    let sql = `SELECT t1.name FROM ${table} AS t1 WHERE t1.deleted_at IS NULL ${transfer_fee_type_filter}`;
    const tranfer_fee = await db.any(sql, param);
    return tranfer_fee.length < 1 ? false : true;
  } catch (err) {
    return true;
  }
}

// exports all transfer fee related callbacks
module.exports = {
  createTransferFee: createTransferFee,
  getTransferFee: getTransferFee
};
