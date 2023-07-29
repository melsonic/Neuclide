import { User } from "../../model/User.js";
import { BlackListedToken } from "../../model/blacklistToken.js";
import { extractJwtToken, extractPayload } from "../jwt/main.js";
import { comparePassword } from "../../hash/password.js";
import constants from "../../constants.js";


/**
 * @description Authentication Middleware
 * @param {*} req - HTTP request object
 * @param {*} res - HTTP response object
 * @param {Function} next - Callback function to pass control to the next middleware
 * @returns {void}
 */
async function authMiddleware(req, res, next) {
  
  // extract the json web token
  const jwt_token = extractJwtToken(req.headers.authorization);

  if (jwt_token === constants.ERROR_MESSAGE.JWT_ERROR) {
    res.status(401).json({
      "message": constants.ERROR_MESSAGE.JWT_EXTRACT_ERROR,
    });
    return;
  }

  // check if token is blacklisted
  try {
    let bltoken = await BlackListedToken.findOne({ token: jwt_token });
    if (bltoken != null) {
      res.status(401).json({
        "message": constants.ERROR_MESSAGE.JWT_TOKEN_BLACKLIST_ERROR,
      });
      return;
    }
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.JWT_TOKEN_SEARCH_DB_ERROR,
    });
    return;
  }

  // extract the payload user
  const user = extractPayload(jwt_token);

  if (user == "jwtError") {
    res.status(401).json({
      "message": constants.ERROR_MESSAGE.JWT_INVALID_TOKEN_ERROR,
    });
    return;
  }

  // find if username already exists
  let dbuser = null;
  try {
    dbuser = await User.findOne({ username: user.username });
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.USER_NOT_REGISTERED_ERROR,
    });
    return;
  }
  
  // if user doesnot exist
  if(dbuser === null) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.USER_NOT_REGISTERED_ERROR,
    });
    return; 
  }
  

  let isSame = comparePassword(user.password, dbuser.password);

  if (!isSame) {
    res.status(401).json({
      "message": constants.ERROR_MESSAGE.PASSWORD_MATCH_ERROR,
    });
    return;
  }

  // store the user for the next
  res.locals.user = user;
  res.locals.jwt_token = jwt_token;

  next();
}

export { authMiddleware };
