import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { router } from "./router/index.js";
import cors from "cors";

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
  console.log("db connected");
}).catch((e) => {
  console.log(`no connection with error ${e} `);
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
