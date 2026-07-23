import express from "express";
import { classify } from "../services/classifyService.js";
import { generateImage } from "../services/image.js";
import { generateText } from "../services/text.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt, history = [] } = req.body;

  if (!prompt.trim()) {
    return res.status(400).json({ error: "Prompt is requried" });
  }

  try {
    const intent = await classify(prompt);

    if (intent === "image") {
      const image = await generateImage(prompt);

      return res.json({
        type: "image",
        answer: image,
      });
    }

    const answer = await generateText(prompt, history);

    return res.json({
      type: "text",
      answer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting response" });
  }
});

export default router;
