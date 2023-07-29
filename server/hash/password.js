import bcrypt from "bcryptjs";
import constants from "../constants.js";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


/**
 * @description Hash the provided password using bcrypt.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password or an error message.
 */
async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    return constants.ERROR_MESSAGE.HASH_ERROR;
  }
}

/**
 * @description Compare a plaintext password with a hashed password from the database.
 * @param {string} password - The plaintext password to be compared.
 * @param {string} dbpassword - The hashed password retrieved from the database.
 * @returns {boolean} Returns true if the plaintext password matches the hashed password, otherwise false.
 */
function comparePassword(password, dbpassword) {
  const isSame = bcrypt.compareSync(password, dbpassword);
  return isSame;
}

export { comparePassword, hashPassword };
