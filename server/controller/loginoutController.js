import { User } from "../model/User.js";
import { comparePassword } from "../hash/password.js";
import { createJwtToken } from "./jwt/main.js";
import { BlackListedToken } from "../model/blacklistToken.js";
import constants from "../constants.js";

/**
 * @description Handles user login and authentication.
 * @param {Object} req - HTTP request object containing user login data in the request body.
 * @param {Object} res - HTTP response object to send the result of the login process.
 * @returns {void}
 */
async function loginController(req, res) {
  let user = req.body;
  let uname = req.body.username;
  let pword = req.body.password;
  let dbuser = null;

  // find if username already exists
  try {
    dbuser = await User.findOne({ username: uname });
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.USER_FINDING_ERROR,
    });
    return;
  }

  if (dbuser == null) {
    res.status(401).json({
      "message": constants.ERROR_MESSAGE.USERNAME_NOT_EXIST_ERROR,
    });
    return;
  }

  let isSame = comparePassword(pword, dbuser.password);

  if (!isSame) {
    res.status(401).json({
      "message": constants.ERROR_MESSAGE.PASSWORD_MATCH_ERROR,
    });
    return;
  }

  const jwt_token = createJwtToken(user);

  res.status(200).json({
    "token": jwt_token,
    "message": constants.RESPONSE_MESSAGE.USER_LOGIN_SUCCESS,
  });
}

/**
 * @description Handles user logout and token blacklisting.
 * @param {*} req - HTTP request object.
 * @param {*} res - HTTP response object.
 * @returns {void}
 */
async function logoutController(req, res) {

  const jwt_token = res.locals.jwt_token;
  // blacklist the jwt token
  let blacklistedtoken = null;
  try {
    blacklistedtoken = await BlackListedToken.create({
      token: jwt_token,
    });
    if (blacklistedtoken == null) {
      res.status(500).json({
        "message": constants.ERROR_MESSAGE.ACCESS_TOKEN_BLACKLISTING_ERROR
      });
      reutrn;
    }
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.ACCESS_TOKEN_BLACKLISTING_ERROR
    });
    return;
  }

  res.status(200).json({
    "message": constants.RESPONSE_MESSAGE.USER_LOGOUT_SUCCESS,
  });
}

export { loginController, logoutController };
