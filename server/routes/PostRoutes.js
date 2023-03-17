import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../Models/Post.js";
import config from "config";

const name = config.get("CloudName");
const ApiKey = config.get("Cloud_Api_Key");
const ApiKeySecret = config.get("Cloud_Api_Secret");

dotenv.config();

const router = express.Router();

// Configuring Cloudinary to store our images
cloudinary.config({
  cloud_name: name,
  api_key: ApiKey,
  api_secret: ApiKeySecret,
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
