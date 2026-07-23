import fs from "fs";
import anthropic from "../config/anthropic.js";

export async function analyzeImage(filePath, mimetype, prompt) {
  const base64Image = fs.readFileSync(filePath, { encoding: "base64" });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "image",
              source: {
                type: "base64",
                media_type: mimetype,
                data: base64Image,
              },
            },
          },
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
  });

  return response.content[0].text;
}
