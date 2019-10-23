/**
 * This file holds all the user related functionality
 */

// Include JWT
const jwt = require("jsonwebtoken");
// Include bcrypt package
const bcrypt = require("bcrypt");
// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");
// Include Mail package
const mail = require("../../lib/mail");

/**
 * Check for a valid user and return auth token and user details
 * @param {*request} req
 * @param {*response} res
 * @return valid JWT token
 */

function login(req, res) {
  // Check user table for a valid user
  let sql = `SELECT u.name,u.email,u.profile_pic,u.status,u.password,u.user_type_id,ut.name as user_type,tz.name AS timezone
                FROM users AS u LEFT JOIN user_types AS ut ON u.user_type_id = ut.id
                LEFT JOIN timezones AS tz ON u.timezone_id = tz.id 
                where u.email = $1 and u.status != 0 limit 1`;

  db
    .one(sql, [req.body.email])
    .then(user => {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return response.error(
          res,
          {},
          "Authentication failed. Wrong password.",
          401
        );
      } else {
        // create JWT token
        const payload = {
          email: user.email,
          type: user.user_type_id,
          timezone: user.timezone
        }; // payload
        let token = jwt.sign(payload, res.app.get("tokenSecret"), {
          expiresIn: res.app.get("expiresInMinutes") * 60 // set in seconds
        });
        // TO DO: profile pic
        const authUser = {
          name: user.name,
          email: user.email,
          profile_pic: user.profile_pic,
          type: user.user_type,
          status: user.status
        };

        // Return with JWT token
        return response.success(
          res,
          { token: token, user: authUser },
          "success"
        );
      }
    })
    .catch(err => {
      // Return with error message
      return response.error(res, err, "Something went wrong!", 401);
    });
}

/**
 * Set a password reset token and sent a email with reset link
 * @param {*request} req
 * @param {*response} res
 * @return send a password reset mail with reset link
 */
function forgetPassword(req, res) {
  db
    .task(async t => {
      // select a valid user or rise a exception
      let sql = `SELECT u.name,u.email FROM users as u WHERE u.email LIKE $1`;
      await t.one(sql, [req.body.email]);

      // delete old password token for the user and create a new token
      sql = `DELETE FROM password_resets as ps WHERE ps.email LIKE $1`;
      const token = await t.result(sql, [req.body.email]).then(result => {
        let _sym = "abcdefghijklmnopqrstuvwxyz1234567890";
        let str = "";

        for (let i = 0; i < 10; i++) {
          str += _sym[parseInt(Math.random() * _sym.length)];
        }
        return str;
      });

      // Insert new token to DB
      sql = `INSERT INTO password_resets(email, token, created_at) VALUES($1, $2, $3)`;
      const created_at = await utilities.createUpdateDate(res);
      await t.none(sql, [req.body.email, token, created_at]).then(data => {
        return true;
      });

      // send forget password mail with reset link
      await sendForgetPasswordMail(req.body.email, token, res);
    })
    .then(data => {
      // return with success message
      return response.success(res, {}, "Mail Send");
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "User not found!", 404);
    });
}

/**
 * Reset new password for user
 * @param {*request} req
 * @param {*response} res
 */
function passwordReset(req, res) {
  let passsword = "";
  db
    .task(async t => {
      // check for a valid password token or raise exception
      let sql = `SELECT pr.email FROM password_resets AS pr WHERE pr.token = $2 AND pr.email = $1`;
      await t.one(sql, [req.body.email, req.body.token]).then(result => {
        passsword = bcrypt.hashSync(req.body.new_password, 10);
      });

      // update user table with new password
      sql = `UPDATE users SET password = $1  WHERE email = $2 returning id`;
      await t.result(sql, [passsword, req.body.email]);

      // Remove the password reset token from DB
      sql = `DELETE FROM password_resets as ps WHERE ps.email LIKE $1`;
      await t.result(sql, [req.body.email]).then(result => {});

      // send success mail
      await sendPasswordResetMail(req.body.email);
    })
    .then(data => {
      //return with success mail
      return response.success(res, {}, "Password Reset Success");
    })
    .catch(err => {
      //return with exception
      return response.error(res, err, "User not found!", 404);
    });
}

/**
 * to get the complete list of users registered
 *
 * @param {any} req
 * @param {any} res
 * @returns array
 */
async function getUserList(req, res) {
  try {
    let userTypeId =
      req.params.userTypeId || req.params.userTypeId == "all"
        ? req.params.userTypeId
        : 0;

    let statusFilter = req.params.userStatusId
      ? `AND u.status = ${req.params.userStatusId}`
      : "AND u.status != 0";

    let sql = `SELECT u.name,u.email,u.profile_pic,u.status,u.user_type_id,ut.name as user_type
                FROM users AS u LEFT JOIN user_types AS ut ON u.user_type_id = ut.id
                where u.user_type_id = $1 ${statusFilter}`;

    const users = await db.any(sql, [userTypeId]);
    // success
    return response.success(res, { users }, `success`);
  } catch (err) {
    // error
    return response.error(res, err, "Something went wrong!", 401);
  }
}

/**
 * to get the purticular(single) user details
 *
 * @param {any} req
 * @param {any} res
 * @returns Array
 */
async function getUser(req, res) {
  try {
    let sql = `SELECT u.name,u.email,u.profile_pic,u.status,u.user_type_id,ut.name as user_type
    FROM users AS u LEFT JOIN user_types AS ut ON u.user_type_id = ut.id
    where u.id = $1 `;

    const user = await db.one(sql, [req.params.userId]);
    return response.success(res, user, `success`);
  } catch (err) {
    return response.error(res, err, "Something went wrong!", 401);
  }
}

/**
 *
 *
 * @param {any} req
 * @param {any} res
 * @returns
 */
function create(req, res) {
  return response.success(res, {}, "test");
}

/**
 * Verify a password reset token is valid or not
 * @param {*request} req
 * @param {*response} res
 */
function verifyToken(req, res) {
  // check for a valid token or raise an exception
  let sql = `SELECT pr.email FROM password_resets AS pr WHERE pr.token = $1`;
  db
    .one(sql, [req.body.token])
    .then(user => {
      // return with success messsage
      return response.success(
        res,
        { token: req.body.token, email: user.email },
        "success"
      );
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Invalid request", 404);
    });
}

/**
 * send a forget password mail with reset link
 * @param {*String} email
 * @param {*String} token
 * @param {*response} res
 */
function sendForgetPasswordMail(email, token, res) {
  // reset password link
  let link =
    res.app.get("baseURL") + res.app.get("resetPasswordUrl") + "?t=" + token;
  let html =
    `<p>You can reset your password by clicking the link below:</p><a href ='` +
    link +
    `'>` +
    link +
    `</a>`;
  // send mail
  mail.sendMail(email, "Password Reset", null, html);
}

/**
 * send password reset success mail
 * @param {*String} email
 */
function sendPasswordResetMail(email) {
  let html = `<p>Your password was successfully changed.</p>`;
  // send mail
  mail.sendMail(email, "Your password has changed.", null, html);
}

/**
 * Update user with given status
 * @param {*int} user_id
 * @param {*int} status
 */
async function updateUserStatus(user_id, status) {
  try {
    let sql = `UPDATE users SET status = $/status/ WHERE id = $/id/`;
    const param = {
      status: status,
      id: user_id
    };
    return await db.one(sql, param);
  } catch (err) {
    return false;
  }
}

function test(req, res) {
  return response.success(res, {}, "test");
}

// exports all user related callbacks
module.exports = {
  login: login,
  test: test,
  forgetpassword: forgetPassword,
  verify_token: verifyToken,
  password_reset: passwordReset,
  list: getUserList,
  userDetails: getUser,
  create: create,
  updateUserStatus: updateUserStatus
};
