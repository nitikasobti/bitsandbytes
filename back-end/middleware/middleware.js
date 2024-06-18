import Course from "../models/courseModel.js"
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log(req.user);
    return res.status(401).json("You are not authenticated")
  }
  next();
};
const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
   if (!course) {
     return res.status(404).json("Course not found");
   }
  if (!course.owner.equals(req.user._id)) {
    console.log(req.user)
    res.status(401).json("Not authorized as owner");
  }
  next();
};

export {isLoggedIn,isOwner}
