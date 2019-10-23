/**
 * check for access token and decode it
 */
const response = require("../lib/common");
var jwt = require("jsonwebtoken");
function auth(req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, res.app.get("tokenSecret"), function(err, decoded) {
      if (err) {
        response.error(res, {}, "Failed to authenticate token.", 401);
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    response.error(res, {}, "No token provided.", 403);
  }
}

module.exports = {
  auth: auth
};
