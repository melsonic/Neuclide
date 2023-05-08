import mongoose from "mongoose";

const BlackListedTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    expires: 60,
  },
});

const BlackListedToken = mongoose.model(
  "BlackListedToken",
  BlackListedTokenSchema,
);

export { BlackListedToken };
