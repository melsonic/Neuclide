import { Subject, SubjectSchema } from "../model/Subject.js";
import { User } from "../model/User.js";
import constants from "../constants.js";

/**
 * @description View subjects associated with the authenticated user.
 * @param {*} req - HTTP request object
 * @param {*} res - HTTP response object
 * @returns {void}
 */
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

/**
 * @description Add a new subject to the subject list.
 * @param {*} req - HTTP request object containing the subject name (req.body.subname).
 * @param {*} res - HTTP response object to send the result of the subject addition process.
 * @returns {void}
 */
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

/**
 * @description Delete a subject from the subject list.
 * @param {*} req - HTTP request object containing the subject name to be deleted (req.body.subname).
 * @param {*} res - HTTP response object to send the result of the subject deletion process.
 * @returns {void}
 */
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

/**
 * @description Update the name of a subject for the authenticated user.
 * @param {*} req - HTTP request object containing the current subject name and the updated subject name.
 * @param {*} res - HTTP response object to send the result of the subject name update process.
 * @returns {void}
 */
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

/**
 * @description Update the number of present classes for a subject.
 * @param {*} req - HTTP request object containing the subject name to mark present (req.body.subname).
 * @param {*} res - HTTP response object to send the result of the marking present process.
 * @returns {void}
 */
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

/**
 * @description Update the number of missed classes for a subject.
 * @param {*} req - HTTP request object containing the subject name to mark absent (req.body.subname).
 * @param {*} res - HTTP response object to send the result of the marking absent process.
 * @returns {void}
 */
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
