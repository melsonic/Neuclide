import { User } from "../model/User.js";

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