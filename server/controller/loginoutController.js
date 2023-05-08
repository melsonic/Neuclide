import { User } from "../model/User.js";
import { comparePassword } from "../hash/password.js";
import { createJwtToken } from "./jwt/main.js";
import { BlackListedToken } from "../model/blacklistToken.js";

// login controller function
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
      "message": "error finding user",
    });
    return;
  }

  if (dbuser == null) {
    res.status(401).json({
      "message": "username doesn't exist",
    });
    return;
  }

  let isSame = comparePassword(pword, dbuser.password);

  if (!isSame) {
    res.status(401).json({
      "message": "password didn't match",
    });
    return;
  }

  const jwt_token = createJwtToken(user);

  res.status(200).json({
    "token": jwt_token,
    "message": "user logged in successfully",
  });
}

// function to logout a user
async function logoutController(req, res) {

  const jwt_token = res.locals.jwt_token;
  // blacklist the jwt token
  let blacklistedtoken = null;
  try {
    blacklistedtoken = await BlackListedToken.create({
      token: jwt_token,
    });
    if(blacklistedtoken == null){
      res.status(500).json({
        "message": "error blacklisting a access token"
      });
      reutrn;
    }
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "error blacklisting a jwt token",
    });
    return;
  }

  res.status(200).json({
    "message": "user logged out successfully",
  });
}

export { loginController, logoutController };
