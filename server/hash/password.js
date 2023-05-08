import bcrypt from "bcryptjs";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.log(err);
    return "herror";
  }
}

function comparePassword(password, dbpassword) {
  const isSame = bcrypt.compareSync(password, dbpassword);
  return isSame;
}

export { comparePassword, hashPassword };
