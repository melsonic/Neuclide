import { Subject } from "../model/Subject.js";
import { User } from "../model/User.js";
import constants from "../constants.js";

async function viewSubjects(req, res) {
  const user = res.locals.user;
  let dbuser = null;
  let subjects = null;
  try {
    dbuser = await User.findOne({ username: user.username });
    subjects = await dbuser.subjects;
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.USER_FINDING_ERROR,
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
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.USER_FINDING_ERROR,
    });
    return;
  }

  try {
    await dbuser.subjects.push(subject_toadd);
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.ADD_SUBJECT_ERROR,
    });
    return;
  }

  try {
    await dbuser.save();
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.SAVE_USER_ERROR,
    });
    return;
  }

  res.status(200).json({
    "message": constants.RESPONSE_MESSAGE.ADD_SUBJECT_SUCCESS,
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
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.USER_FINDING_ERROR,
    });
    return;
  }

  try {
    await dbuser.subjects.pull({ name: subject_name });
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.DELETE_SUBJECT_ERROR,
    });
    return;
  }

  try {
    await dbuser.save();
  } catch (err) {
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.SAVE_USER_ERROR,
    });
    return;
  }

  res.status(200).json({
    "message": constants.RESPONSE_MESSAGE.DELETE_SUBJECT_SUCCESS,
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
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.UPDATE_SUBJECT_NAME_ERROR,
    });
    return;
  }

  res.status(200).json({
    "message": constants.RESPONSE_MESSAGE.UPDATE_SUBJECT_NAME_SUCCESS,
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
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.MARK_PRESENT_ERRORR,
    });
    return;
  }

  res.status(200).json({
    "message": constants.RESPONSE_MESSAGE.MARK_PRESENT_SUCCESS,
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
    res.status(500).json({
      "message": constants.ERROR_MESSAGE.MARK_ABSENT_ERROR,
    });
    return;
  }

  res.status(200).json({
    "message": constants.RESPONSE_MESSAGE.MARK_ABSENT_SUCCESS,
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
