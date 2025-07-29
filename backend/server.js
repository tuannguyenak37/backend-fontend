import express from "express";
import cors from "cors";
import userRoutes from "./routes/web.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend Express đang hoạt động!" });
});

app.use("/api", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server đang chạy tại http://localhost:${PORT}`);
});
