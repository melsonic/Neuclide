import mongoose from "mongoose";

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

const Subject = mongoose.model("Subject", SubjectSchema);

export { Subject, SubjectSchema };
