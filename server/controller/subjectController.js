import { Subject } from "../model/Subject.js";
import { User } from "../model/User.js";

async function viewSubjects(req, res) {
  const user = res.locals.user;
  let dbuser = null;
  let subjects = null;
  try {
    dbuser = await User.findOne({ username: user.username });
    subjects = await dbuser.subjects;
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "eror finding user | pushing subject | saving user",
    });
    return;
  }

  res.status(200).json({
    subjects
  })
}

// add subject
// takes the subject name `subname` from the req.body
// @param subname
async function addSubject(req, res) {
  const subject_name = req.body.subname;
  const user = res.locals.user;

  let subject_toadd = new Subject({
    name: subject_name,
    present: 0,
    absent: 0,
  });

  let dbuser = null;
  try {
    dbuser = await User.findOne({ username: user.username });
    await dbuser.subjects.push(subject_toadd);
    await dbuser.save();
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "eror finding user | pushing subject | saving user",
    });
    return;
  }

  res.status(200).json({
    "message": "subject added successfully",
  });
}

// delete subject
// takes the subject name `subname` from the req.body
// @param subname
async function deleteSubject(req, res) {
  const subject_name = req.body.subname;
  const user = res.locals.user;

  let dbuser = null;
  try {
    dbuser = await User.findOne({ username: user.username });
    await dbuser.subjects.pull({ name: subject_name });
    await dbuser.save();
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "eror finding user | deleting subject | saving user",
    });
    return;
  }

  res.status(200).json({
    "message": "subject removed successfully",
  });
}

// update subject name
// @param original_subname
// @param updated_subname
async function updateSubjectName(req, res) {
  const subname = req.body.subname;
  const updated_subname = req.body.updated_subname;
  const user = res.locals.user;

  let dbuser = null;
  try {
    dbuser = await User.findOneAndUpdate(
      {
        username: user.username,
        "subjects.name": subname,
      },
      {
        $set: { "subjects.$.name": updated_subname },
      },
      { new: true },
    );

    await dbuser.save();
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "error updating sub name",
    });
    return;
  }

  res.status(200).json({
    "message": "subject name updated successfully",
  });
}

// update attended i.e increase it by 1
// @param : `subname` for targeted subject name
async function updateAttendedClasses(req, res) {
  const subname = req.body.subname;
  const user = res.locals.user;

  let dbuser = null;
  try {
    dbuser = await User.findOneAndUpdate(
      {
        username: user.username,
        "subjects.name": subname,
      },
      {
        $inc: { "subjects.$.present": 1 },
      },
      { new: true },
    );

    await dbuser.save();
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "error updating sub present classes count",
    });
    return;
  }

  res.status(200).json({
    "message": "attendance added successfully",
  });
}

// update missed i.e increase it by 1
// @param : `subname` for targeted subject name
async function updateMissedClasses(req, res) {
  const subname = req.body.subname;
  const user = res.locals.user;

  let dbuser = null;
  try {
    dbuser = await User.findOneAndUpdate(
      {
        username: user.username,
        "subjects.name": subname,
      },
      {
        $inc: { "subjects.$.absent": 1 },
      },
      { new: true },
    );

    await dbuser.save();
  } catch (err) {
    console.log(`db error : ${err}`);
    res.status(500).json({
      "message": "error updating sub absent classes count",
    });
    return;
  }

  res.status(200).json({
    "message": "missed class added successfully",
  });
}

export {
  viewSubjects,
  addSubject,
  deleteSubject,
  updateAttendedClasses,
  updateMissedClasses,
  updateSubjectName,
};
