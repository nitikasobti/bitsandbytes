import express from 'express';
import { google } from 'googleapis';
import Video from '../models/videoModel.js';

const router = express.Router();
const fetchVideoDetails = async (videoId) => {
  try {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.API_KEY,
    });

    // const response = await axios.get(
    //     `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}`
    //   );

    const response = await youtube.videos.list({
      part:`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}`,
      id: videoId,
    });

    const videoInfo = response.data.items[0].snippet;
    const videoLink = `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`;
    const title = videoInfo.title;
    const description = videoInfo.description;

    return { videoLink, title, description };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
}

// Route to add a video
router.post('/videos', async (req, res) => {
  const { videoId } = req.body;

  try {
    // Fetch video details from YouTube
    const { videoLink, title, description } = await fetchVideoDetails(videoId);

    // Create a new Video document with fetched details
    const newVideo = new Video({
      videoLink,
      title,
      description,
    });

    // Save the new Video document to the database
    const savedVideo = await newVideo.save();

    res.status(201).json(savedVideo);
  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all videos
router.get('/videos', async (req, res) => {
  try {
    // Find all Video documents in the database
    const videos = await Video.find();

    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add routes for updating and deleting videos as needed

export {router, fetchVideoDetails};
