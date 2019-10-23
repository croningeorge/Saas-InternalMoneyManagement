const response = require("../lib/common");

/**
 * To verify wheather the logged in user has permission to access certain functions/routes
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns callback
 */
async function verify(req, res, next) {
  try {
    //checks wheather the user is logged in or not
    if (typeof req.decoded != undefined) {
      let sql = `SELECT per.id FROM permissions AS per LEFT JOIN role_has_permissions AS r ON r.permission_id = per.id
        WHERE per.route =  $1 AND per.method = $2 AND r.role_id =  $3`;
      let originalUrl = req.baseUrl + req.route.path;

      const allowed = await db.one(sql, [
        originalUrl,
        req.method,
        req.decoded.type
      ]);
      next();
    } else {
      //return error
      response.error(res, {}, "Unauthorized user", 403);
    }
  } catch (err) {
    return response.error(res, {}, "Unauthorized user!", 403);
  }
}

module.exports = {
  verify: verify
};
