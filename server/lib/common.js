/**
 * send success response
 * @param {*response} res
 * @param {*json} data
 * @param {*string} message
 */
function send_success_response(res, data, message) {
  let token = res.tokenExpired
    ? { token_expired: 1, new_token: res.newToken }
    : { token_expired: 0 };

  return res
    .status(200)
    .json({ success: 1, data: data, message: message, token: token });
}

/**
 * send error message
 * @param {*response} res
 * @param {*json} data
 * @param {*string} message
 * @param {*int} status
 */
function send_error_response(res, data, message, status) {
  return res.status(status).json({ success: 0, data: data, message: message });
}

/**
 *
 * @param {*int} id
 */
async function getModelById(table, id) {
  try {
    const param = {
      id: id
    };
    let sql = `SELECT t1.id FROM ${table} as t1 WHERE t1.id = $/id/ AND t1.deleted_at IS NULL`;
    return await db.any(sql, param);
  } catch (err) {
    return [];
  }
}

module.exports = {
  success: send_success_response,
  error: send_error_response,
  getModelById: getModelById
};
