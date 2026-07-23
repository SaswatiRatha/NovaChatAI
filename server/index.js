import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.js";
import transcribeRoute from "./routes/transcribe.js";
import visionRoute from "./routes/vision.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);
app.use("/api/transcribe", transcribeRoute);
app.use("/api/vision", visionRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
