import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import constants from "../../constants.js";

dotenv.config();

const privateKey = process.env.JWT_PRIVATE_KEY;

/**
 * @description Create a JSON Web Token (JWT) for the provided user data.
 * @param {*} user - User object containing the necessary data to generate the token (e.g., username, password).
 * @returns {string} The generated JSON Web Token.
 */
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

/**
 * @description Extracts the JSON Web Token (JWT) from the Authorization header.
 * @param {string} authHeader - The Authorization header containing the JWT.
 * @returns {string} The extracted JSON Web Token or an error message if extraction fails.
 */
function extractJwtToken(authHeader) {
  if (!authHeader) return constants.ERROR_MESSAGE.JWT_ERROR;
  const token = authHeader.split(" ")[1];
  if (!token) return constants.ERROR_MESSAGE.JWT_ERROR;
  return token;
}

/**
 * @description extracts payload from a jwt token
 * @param {string} token - The JSON Web Token to extract and verify the payload from.
 * @returns {Object | string} The payload object containing user data or an error message if verification fails.
 */
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
