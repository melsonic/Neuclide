import mongoose from "mongoose";
import constants from "../constants.js";

const SubjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  present: {
    type: Number,
    default: 0,
  },
  absent: {
    type: Number,
    default: 0,
  },
});

const Subject = mongoose.model(constants.MODEL.SUBJECT, SubjectSchema);

export { Subject, SubjectSchema };
