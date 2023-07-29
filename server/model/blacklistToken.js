import mongoose from "mongoose";
import constants from "../constants.js";

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
  constants.MODEL.BLACK_LISTED_TOKEN,
  BlackListedTokenSchema,
);

export { BlackListedToken };
