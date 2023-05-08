import express from "express";
import {
  viewSubjects,
  addSubject,
  deleteSubject,
  updateAttendedClasses,
  updateMissedClasses,
  updateSubjectName,
} from "../controller/subjectController.js";
import { authMiddleware } from "../controller/middleware/authorized.js";

const router = express.Router();

router.get("/getsubs", authMiddleware, viewSubjects);
router.post("/add", authMiddleware, addSubject);
router.post("/delete", authMiddleware, deleteSubject);
router.post("/updatename", authMiddleware, updateSubjectName);
router.post("/updateattended", authMiddleware, updateAttendedClasses);
router.post("/updatemissed", authMiddleware, updateMissedClasses);

export { router as subjectRoutes };
