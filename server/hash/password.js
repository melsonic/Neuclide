import bcrypt from "bcryptjs";
import constants from "../constants.js";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    return constants.ERROR_MESSAGE.HASH_ERROR;
  }
}

function comparePassword(password, dbpassword) {
  const isSame = bcrypt.compareSync(password, dbpassword);
  return isSame;
}

export { comparePassword, hashPassword };
