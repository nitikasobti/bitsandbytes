import Quiz from "../models/quizModel.js";
import Course from "../models/courseModel.js";

const createQuiz = async (req, res) => {
  try {
    const { courseId, questions } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const quizzes = questions.map((q, index) => {
      const { ques, ans, correct } = q;
      const quiz = new Quiz({
        course: courseId,
        ques,
        ans,
        correct,
        videoLink: course.videoDetails[index].videoUrl,
      });
      return quiz;
    });

    const savedQuizzes = await Quiz.insertMany(quizzes);

    course.quizzes.push(...savedQuizzes.map((quiz) => quiz._id));
    await course.save();

    return res.json(savedQuizzes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while creating the quizzes." });
  }
};

export { createQuiz };