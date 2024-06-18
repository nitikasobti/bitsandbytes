import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    watchHistory: [
      {
        courseName: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        durationWatched: {
          type: Number,
          required: true,
        },
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    coursesEnrolled: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameUnique: true,
  usernameQueryFields: ["email"],
});


export default mongoose.model("User",UserSchema)