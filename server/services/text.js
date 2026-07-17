import ai from "../config/genai";

export async function generateText(question) {
  const interaction = await ai.interactions.create({
    model: "gemini-2.5-flash",
    input: question,
  });
  return interaction.output_text;
}
