import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { router } from "./router/index.js";
import cors from "cors";
import constants from "./constants.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// database
mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(constants.RESPONSE_MESSAGE.DB_CONNECT_SUCCESS);
}).catch((e) => {
  console.log(constants.ERROR_MESSAGE.DB_CONNECT_ERROR + e);
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(constants.RESPONSE_MESSAGE.SERVER_LISTENING_SUCCESS + PORT);
});
