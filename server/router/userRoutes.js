import express from "express";
import { registerController } from "../controller/registerController.js";
import {
  loginController,
  logoutController,
} from "../controller/loginoutController.js";
import { authMiddleware } from "../controller/middleware/authorized.js";
import { getUserController } from "../controller/getUserController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", authMiddleware, logoutController);
router.get("/getuser", authMiddleware, getUserController);

export { router as userRoutes };
