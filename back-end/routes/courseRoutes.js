import express from "express";
import {isLoggedIn,isOwner} from "../middleware/middleware.js"
const router = express.Router();
 import {createCourse,viewCourse,updateCourse,deleteCourse} from "../controllers/courseCont.js"

 router.post("/create",isLoggedIn,createCourse);
 router.get("/:id", viewCourse);
 router.put("/:id",isOwner, updateCourse);
 router.delete("/:id", isOwner,deleteCourse);
 
 export default router;