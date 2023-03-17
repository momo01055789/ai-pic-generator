import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import config from "config";

const apiKey = config.get("ApiKey");

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.ApiKey,
});

const openAi = new OpenAIApi(configuration);

router.get("/", (req, res) => {
  res.send("Hello from Dalle");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openAi.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(err?.response.data.error.message || "something went wrong");
  }
});

export default router;
