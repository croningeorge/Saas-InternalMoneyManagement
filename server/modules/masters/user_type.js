/**
 * This file holds all the user type related functionality
 */

// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

/**
 * List all active user types
 * @param {*request} req
 * @param {*response} res
 * @return array of user types
 */

async function listUserTypes(req, res) {
  try {
    let sql = "SELECT ut.id, ut.name, ut.status FROM user_types ut";
    var param = {};
    var where = false;
    const status = ["1", "0"];
    if (req.params.status) {
      if (req.params.status != "all" && status.includes(req.params.status)) {
        where = true;
        sql += " WHERE ut.status = ${status} ";
        param.status = req.params.status;
      }
    }

    if (req.params.id) {
      if (!where) {
        sql += " WHERE ";
        where = true;
      } else {
        sql += " AND ";
      }
      sql += "ut.id = ${id}";
      param.id = req.params.id;
    }

    if (!where) {
      sql += " WHERE ";
      where = true;
    } else {
      sql += " AND ";
    }
    sql += " ut.deleted_at IS NULL";

    const user_types = await db.any(sql, param);
    // success
    return response.success(res, user_types, "success");
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Create new user type
 * @param {*request} req
 * @param {*response} res
 */
async function createUserType(req, res) {
  let name = req.body.name;
  const created_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql =
        "SELECT ut.name FROM user_types as ut WHERE ut.name = $1 AND ut.deleted_at IS NULL";
      const user_types = await db.any(sql, [name]);
      if (user_types.length < 1) {
        // if no add
        sql =
          "INSERT INTO user_types(name, status, created_at) VALUES(${name}, ${status}, ${created_at}) RETURNING id";
        const param = {
          name: name,
          status: 1,
          created_at: created_at
        };
        return await db.one(sql, param); // return insert id
      } else {
        // else return 0
        return false;
      }
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "User Type created"
        );
      } else {
        response.error(res, {}, "User type already exist!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

/**
 * Update Usertype details
 * @param {*request} req
 * @param {*response} res
 */
async function updateUserType(req, res) {
  let name = req.body.name;
  let id = req.body.id;
  let status = req.body.status;
  let updated_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql =
        "SELECT ut.name, ut.status, ut.id FROM user_types as ut WHERE ut.name = $1 AND ut.deleted_at IS NULL";
      const user_types = await db.any(sql, [name]);
      if (user_types.length < 1 || user_types[0].id == id) {
        // if no add
        sql =
          "UPDATE user_types SET name = ${name}, status = ${status}, updated_at = ${updated_at} WHERE id = ${id} AND deleted_at IS NULL RETURNING id";
        const param = {
          name: name,
          status: status,
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
          "User Type updated"
        );
      } else {
        response.error(res, {}, "User type name already exist!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * Remove a user type(soft delete)
 * @param {*request} req
 * @param {*response} res
 */
async function removeUserType(req, res) {
  let id = req.body.id;
  let deleted_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql =
        "UPDATE user_types SET deleted_at = ${deleted_at} WHERE id = ${id} RETURNING id";
      let param = {
        deleted_at: deleted_at,
        id: id
      };
      return await db.one(sql, param);
    })
    .then(data => {
      return response.success(res, { id: data.id }, "User Type removed");
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

// exports all user type related callbacks
module.exports = {
  listUserTypes: listUserTypes,
  createUserType: createUserType,
  updateUserType: updateUserType,
  removeUserType: removeUserType
};
