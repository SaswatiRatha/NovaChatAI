import ai from "../config/genai";

export async function classify(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are an AI request classifier.
        
            RETURN ONLY one of these words from below Choices:
            
            Choices:
            text
            image
            
            User request:
            ${prompt}
            `,
  });
  return response.text.trim().toLowerCase();
}
