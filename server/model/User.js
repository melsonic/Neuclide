import mongoose from "mongoose";
import { SubjectSchema } from "./Subject.js";

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

const User = mongoose.model("User", UserSchema);

export { User };
