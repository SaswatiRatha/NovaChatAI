import axios from "axios";

export async function generateImage(prompt) {
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
  return `data:image/png;base64,${response.data.result.image}`;
}
