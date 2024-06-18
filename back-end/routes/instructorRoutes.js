import express from "express";
const router = express.Router();
import {
  becomeInstructor,
  getInstructorById,
  deleteInstructorById,
} from "../controllers/instructorCont.js";
import { isLoggedIn } from "../middleware/middleware.js";

router.post('/becomeInstructor',isLoggedIn, becomeInstructor);
router.get('/:id', getInstructorById);
router.delete('/:id', isLoggedIn,deleteInstructorById);

export default router; 