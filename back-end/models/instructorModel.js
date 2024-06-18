import mongoose from "mongoose";
const Schema=mongoose.Schema;
const InstructorSchema = new Schema(
  {
   
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Instructor",InstructorSchema)