import express from "express";
import fs from "fs";
import upload from "../middleware/upload.js";
import ai from "../config/genai.js";

const router = express.Router();

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    const audioBuffer = fs.readFileSync(req.file.path);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: audioBuffer.toString("base64"),
          },
        },
        {
          text: "Transcribe this audio exactly as spoken",
        },
      ],
    });
    fs.unlinkSync(req.file.path);
    res.json({
      transcript: response.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Transcription failed" });
  }
});

export default router;
