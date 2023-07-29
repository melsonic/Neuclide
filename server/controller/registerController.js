import {User} from "../model/User.js";
import { hashPassword } from "../hash/password.js";
import { createJwtToken } from "./jwt/main.js";
import constants from "../constants.js";

/**
 * @description Handles user registration process.
 * @param {*} req - HTTP request object containing user registration data in the request body.
 * @param {*} res - HTTP response object to send the result of the registration process.
 * @returns {void}
 */
async function registerController(req, res) {
  let user = req.body;
  let uname = user.username;
  let pword = user.password;

  // hash the password
  try {
    pword = await hashPassword(pword);
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.PASSWORD_HASH_ERROR
    });
    return;
  }

  let dbuser = null;

  // find if username already exists
  try {
    dbuser = await User.findOne({username: uname});
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.USER_FINDING_ERROR
    });
    return;
  }

  if(dbuser == null){
    let tuser = new User({
      username: uname,
      password: pword
    });

    try {
      dbuser = await User.create(tuser);
    } catch (err) {
      res.status(500).json({
        "message": constants.ERROR_MESSAGE.CREATE_NEW_USER_ERROR
      });
      return;
    }
    
  }else{
    res.status(401).json({
      "message": constants.RESPONSE_MESSAGE.USERNAME_ALREADY_EXIST
    });
    return;
  }
  
  const jwt_token = createJwtToken(user);

  res.status(200).json({
    "token": jwt_token,
    "message": constants.RESPONSE_MESSAGE.USER_REGISTER_SUCCESS
  });

}

export {registerController};
