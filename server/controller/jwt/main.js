import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
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
      expiresIn: "1h",
    },
  );
  return token;
}

// function to extract the jwt token from the authorization header
function extractJwtToken(authHeader) {
  if (!authHeader) return "jwtError";
  const token = authHeader.split(" ")[1];
  if (!token) return "jwtError";
  return token;
}

// function to extract payload from a token
function extractPayload(token) {
  let user = null;
  try {
    user = jwt.verify(token, privateKey);
    const isExpire = Date.now() > (user.exp * 1000);
    if (isExpire) return "jwtError";
  } catch (err) {
    console.log(`err : ${err}`);
    return "jwtError";
  }
  return user;
}

export { createJwtToken, extractJwtToken, extractPayload };
