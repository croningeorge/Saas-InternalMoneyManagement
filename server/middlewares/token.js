const response = require("../lib/common");
const jwt = require("jsonwebtoken");
const axios = require("axios");

/**
 * To verify wheather the logged in user has permission to access certain functions/routes
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns callback
 */
function verify(req, res, next) {
  try {
    const authToken =
      req.body.token || req.query.token || req.header("Authorization");
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, res.app.get("tokenSecret"), function(err, decoded) {
        if (err) {
          checkMagentoUser(authToken, req, res, next);
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          req.mobile = true;
          next();
        }
      });
    } else if (authToken) {
      checkMagentoUser(authToken, req, res, next);
    } else {
      // if there is no token return an error
      response.error(res, {}, "No token provided.", 403);
    }
  } catch (err) {
    return response.error(res, {}, "Unauthorized user!", 403);
  }
}

/**
 * to set the token for using the services
 *
 * @param {any} user
 * @param {any} authToken
 * @param {any} res
 * @param {any} next
 * @returns
 */
async function setToken(user, authToken, req, res, next) {
  try {
    let sql = `SELECT u.id,u.email,u.user_type_id,tz.name AS timezone 
    FROM users u
    LEFT JOIN timezones tz ON u.timezone_id = tz.id  
    WHERE u.email = $1 AND u.ecommerce_user_id = $2 AND u.status IN (1,2,3,4,0)`;

    const allowed = await db.one(sql, [user.data.email, user.data.id]);
    // payload
    const payload = {
      id: allowed.id,
      email: user.data.email,
      type: allowed.user_type_id,
      timezone: allowed.timezone,
      authToken: authToken
    };
    // create JWT token
    let token = jwt.sign(payload, res.app.get("tokenSecret"), {
      expiresIn: res.app.get("expiresInSecondsMobile") * 60 // set in seconds
    });

    res.tokenExpired = true;
    res.newToken = token;
    req.decoded = payload;
    req.mobile = true;
    next();
  } catch (err) {
    return response.error(res, { err }, "Unauthorized user!", 403);
  }
}

/**
 * to check the authorization key from magento
 *
 * @param {any} authToken
 * @param {any} res
 * @param {any} next
 */
async function checkMagentoUser(authToken, req, res, next) {
  try {
    let header = {
      headers: { Authorization: authToken }
    };

    await axios
      .get(res.app.get("authUrl"), header)
      .then(function(user) {
        setToken(user, authToken, req, res, next);
      })
      .catch(function(err) {
        return response.error(res, { err }, "Unauthorized user!", 403);
      });
  } catch (err) {
    return response.error(res, { err }, "Unauthorized user!", 403);
  }
}

module.exports = {
  verify: verify
};
