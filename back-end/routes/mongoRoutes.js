import express from "express"
const router=express.Router()
import passport from "passport";
import {
  registerUser,
  loginUser,
  getLogin,
  logoutUser,
  currentUserDetails,
} from "../controllers/mongoCont.js";

//auth routes
router.post("/register", registerUser);
router.get("/login", getLogin);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  loginUser
);
router.get("/logout", logoutUser);
router.get("/currentUser", currentUserDetails);

export default router;