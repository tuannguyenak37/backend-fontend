import express from "express";
import cors from "cors";
import user from "./routes/web.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Xin chào từ backend Express!" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server is running at http://localhost:${PORT}`);
});
app.use("/api", user);
