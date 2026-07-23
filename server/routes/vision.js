import express from "express";
import fs from "fs";
import upload from "../middleware/upload.js";
import { analyzeImage } from "../services/vision.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is requried" });
    }

    const prompt = req.body.prompt || "What's in this image?";
    const answer = await analyzeImage(req.file.path, req.file.mimetype, prompt);

    fs.unlinkSync(req.file.path);
    res.json({ type: "text", answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Vision request failed" });
  }
});

export default router;
