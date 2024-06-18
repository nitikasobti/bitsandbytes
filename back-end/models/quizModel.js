import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        ques: {
            type: String,
            required: true,
        },
        ans: {
            type: String,
            required: true,
        },
        correct: {
            type: Boolean,
            required: true,
        },
        videoLink: 
        { 
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Quiz", quizSchema);
