import mongoose from "mongoose";
import { SubjectSchema } from "./Subject.js";
import constants from "../constants.js";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subjects: [SubjectSchema],
});

const User = mongoose.model(constants.MODEL.USER, UserSchema);

export { User };
