import {User} from "../model/User.js";
import { hashPassword } from "../hash/password.js";

async function registerController(req, res) {
  let user = req.body;
  let uname = user.username;
  let pword = user.password;

  // hash the password
  try {
    pword = await hashPassword(pword);
  } catch (err) {
    console.log(`hashing error : ${err}`);
    res.status(500).json({
      "message": "error hashing the password"
    });
    return;
  }

  let dbuser = null;

  // find if username already exists
  try {
    dbuser = await User.findOne({username: uname});
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "error finding user"
    });
    return;
  }

  if(dbuser == null){
    let tuser = new User({
      username: uname,
      password: pword
    });

    try {
      dbuser = await User.create(tuser);
    } catch (err) {
      console.log(`db error : ${err}`);
      res.status(500).json({
        "message": "error creating new user"
      });
      return;
    }
    
  }else{
    res.status(401).json({
      "message": "username already exists"
    });
    return;
  }

  res.status(200).json({
    "user": dbuser,
    "message": "user registered successfully"
  });

}

export {registerController};
