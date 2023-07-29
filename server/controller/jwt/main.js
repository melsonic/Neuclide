import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import constants from "../../constants.js";

dotenv.config();

const privateKey = process.env.JWT_PRIVATE_KEY;

// function to create jwt token for a user
function createJwtToken(user) {
  const token = jwt.sign(
    {
      username: user.username,
      password: user.password,
    },
    privateKey,
    {
      expiresIn: constants.JWT_TOKEN_EXPIRE.ONE_HOUR,
    },
  );
  return token;
}

// function to extract the jwt token from the authorization header
function extractJwtToken(authHeader) {
  if (!authHeader) return constants.ERROR_MESSAGE.JWT_ERROR;
  const token = authHeader.split(" ")[1];
  if (!token) return constants.ERROR_MESSAGE.JWT_ERROR;
  return token;
}

// function to extract payload from a token
function extractPayload(token) {
  let user = null;
  try {
    user = jwt.verify(token, privateKey);
    const isExpire = Date.now() > (user.exp * 1000);
    if (isExpire) return constants.ERROR_MESSAGE.JWT_ERROR;
  } catch (err) {
    return constants.ERROR_MESSAGE.JWT_ERROR;
  }
  return user;
}

export { createJwtToken, extractJwtToken, extractPayload };
