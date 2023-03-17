import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../Models/Post.js";

dotenv.config();

const router = express.Router();

// Configuring Cloudinary to store our images
cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.Cloud_Api_Key,
  api_secret: process.env.Cloud_Api_Secret,
});

// Routes
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

export default router;
