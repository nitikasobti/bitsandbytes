import Course from "../models/courseModel.js";
import Instructor from "../models/instructorModel.js";
import axios from "axios";
import "dotenv/config";

const videoUser = async (playlistId) => {
  try {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}`
    );

    const videoDetails = response.data.items.map((item) => {
      return {
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      };
    });

    return videoDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createCourse = async (req, res) => {
  try {
    const { courseTitle, coursePrice, coursePlaylist, courseInfo } = req.body;
    //const owner=req.user._id;
    const url = new URL(coursePlaylist);
    const params = new URLSearchParams(url.search);
    const playlistId = params.get("list");
    if (!playlistId) {
      console.log(playlistId);
      return res.json("Broken url");
    }
    const ownerId = req.user._id;
    const videoDetails = await videoUser(playlistId);
    const noOfVideos = videoDetails.length;
    const course = new Course({
      courseTitle,
      coursePrice,
      coursePlaylist,
      noOfVideos,
      videoDetails,
      owner: ownerId,
      courseInfo,
    });
    const savedCourse = await course.save();
    const instructor = await Instructor.findById(ownerId);
    if (!instructor) {
      console.error("Instructor not found");
      return res.status(404).json({ message: "Instructor not found" });
    }
    instructor.courses.push(savedCourse._id);
    await instructor.save();
    return res.json(savedCourse);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the course." });
  }
};
const viewCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    return res.json(course);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the course." });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }
    return res.json(updatedCourse);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the course." });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    return res.json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the course." });
  }
};

export { createCourse, viewCourse, updateCourse, deleteCourse };
