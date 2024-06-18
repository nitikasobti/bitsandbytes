import express from "express";
const router = express.Router();
import { detailsUser, deleteUser, updateUser,enrollInCourse } from "../controllers/userCont.js";

// user routes
router.get("/:id", detailsUser);
router.put("/:id",  updateUser);
router.delete("/:id", deleteUser);
router.post("/enroll",enrollInCourse);
export default router;
 