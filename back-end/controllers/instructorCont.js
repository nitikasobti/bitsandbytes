import Instructor from "../models/instructorModel.js";
const becomeInstructor = async (req, res) => {
  try {
    const userId = req.user._id;
    const instructor = new Instructor({ _id: userId });
    await instructor.save();
    return res.json(instructor);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while becoming an instructor." });
  }
};

const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id );
    if (!instructor)
    {
      return res.json("Instructor not found.");
    }
    return res.json(instructor);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the instructor." });
  }
};

const deleteInstructorById = async (req, res) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndDelete(
      req.params.id
    );
    if (!deletedInstructor)
      return res.status(404).json({ message: "Instructor not found." });
    return res.json({ message: "Instructor deleted successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the instructor." });
  }
};
export { becomeInstructor, getInstructorById, deleteInstructorById };
