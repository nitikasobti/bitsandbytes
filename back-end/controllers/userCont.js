import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import Instructor from "../models/instructorModel.js"
const detailsUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.status(500).json("User not defined")
  }
  
};
const updateUser = async (req, res) => {
  const result = await User.findByIdAndUpdate(req.params.id, req.body);
  if (result) {
    res.send("Updated successfully");
  } else {
    res.send("User not found");
  }
};
const deleteUser = async (req, res) => {
   
  const result = await User.findByIdAndDelete(req.params.id);
  if (result) {
    const instructor = await Instructor.findById(req.params.id);
    if (instructor) {
      const deletedInstructor = await Instructor.findByIdAndDelete(
        req.params.id
      );
    }
    res.send("Deleted successfully");
  } else {
    res.send("User not found");
  }
};
const enrollInCourse = async (req, res) => {
  try {
    const { courseId, instructorId } = req.body;
    const userId=req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    if (!user.coursesEnrolled) {
      user.coursesEnrolled = [];
    }
    const isEnrolled = await user.coursesEnrolled.some(
      async(course) => course.courseId.toString() === courseId
    );
    if (isEnrolled)
      return res
        .status(400)
        .json({ message: "You have already enrolled in this course." });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });
    course.studentsEnrolled.push(userId);
    const instructor = await Instructor.findById(instructorId);
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found." });
    instructor.subscribers.push(userId);

     await user.coursesEnrolled.push({
        courseId:courseId,
        owner: instructorId,
        status: false,
      });
      await Promise.all([course.save(), instructor.save(), user.save()]);
    return res.json({ message: "Enrolled successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while enrolling in the course." });
  }
};
export { detailsUser,deleteUser,updateUser ,enrollInCourse};