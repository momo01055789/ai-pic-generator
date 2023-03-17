import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./DB/connect.js";
import PostRoutes from "./routes/PostRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import config from "config";

dotenv.config();

const app = express();
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api/post", PostRoutes);
app.use("/api/dalle", dalleRoutes);
app.get("/", async (req, res) => {
  res.setEncoding("hello from node");
});

// Connect to DB
try {
  connectDB(uri);
} catch (err) {
  console.log(err);
}
app.listen(3001, () => {
  console.log("server has started on port 3001");
});
