import { User } from "../model/User.js";

/**
 * @description Checks user information to send response if the user is authenticated.
 * @param {*} req - HTTP request object containing user data (such as user authentication details).
 * @param {*} res - HTTP response object to send the result of the user authentication status.
 * @returns {void}
 */
export function getUserController(req, res) {
  const user = res.locals.user;

  if (!user) {
    res.status(401).json({
      "authorized": false
    });
    return;
  }

  res.status(200).json({
    "authorized": true
  });
}