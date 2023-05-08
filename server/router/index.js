import express from "express";
import { userRoutes } from "./userRoutes.js";
import { subjectRoutes } from "./subjectRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/subject", subjectRoutes);

export { router };
