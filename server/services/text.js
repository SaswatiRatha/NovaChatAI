import anthropic from "../config/anthropic.js";

export async function generateText(question, history = []) {
  const messages = [...history, { role: "user", content: question }];
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages,
  });
  return response.content[0].text;
}
