import { User } from "../../model/User.js";
import { BlackListedToken } from "../../model/blacklistToken.js";
import { extractJwtToken, extractPayload } from "../jwt/main.js";
import { comparePassword } from "../../hash/password.js";

// check if a token is valid or not
async function authMiddleware(req, res, next) {
  // extract the json web token
  const jwt_token = extractJwtToken(req.headers.authorization);
  if (jwt_token == "jwtError") {
    res.status(401).json({
      "message": "error extracting jwt",
    });
    return;
  }

  // check if token is blacklisted
  try {
    let bltoken = await BlackListedToken.findOne({ token: jwt_token });
    if (bltoken != null) {
      res.status(401).json({
        "message": "token is blacklisted, please log in",
      });
      return;
    }
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "error searching token in db",
    });
    return;
  }

  // extract the payload user
  const user = extractPayload(jwt_token);

  if (user == "jwtError") {
    res.status(401).json({
      "message": "token is invalid | error extracting payload",
    });
    return;
  }

  // find if username already exists
  let dbuser = null;
  try {
    dbuser = await User.findOne({ username: user.username });
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "error finding user, user not logged in",
    });
    return;
  }

  let isSame = comparePassword(user.password, dbuser.password);

  if (!isSame) {
    res.status(401).json({
      "message": "password didn't match",
    });
    return;
  }

  // store the user for the next
  res.locals.user = user;
  res.locals.jwt_token = jwt_token;

  next();
}

export { authMiddleware };
