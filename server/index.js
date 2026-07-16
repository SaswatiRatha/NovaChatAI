import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import multer from "multer";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const upload = multer({ dest: "uploads/" });

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const interaction = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: question,
    });
    res.json({ answer: interaction.output_text });
  } catch (error) {
    console.error("Gemini error: ", error);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

app.post("/api/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        prompt,
        width: 1024,
        height: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      },
    );

    res.json({
      image: `data:image/png;base64,${response.data.result.image}`,
    });
  } catch (error) {
    console.error(error.response?.data || error);

    res.status(500).json({
      error: "Image generation failed",
    });
  }
});

app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
