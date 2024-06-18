import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        videoLink: {
            type: String,
            required: true,
        },
        questions: [
            {
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
            },
        ],
        timeWatched: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Video", videoSchema);
