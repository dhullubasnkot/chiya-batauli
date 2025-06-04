import express, { Request, Response, NextFunction } from "express";
import itemsroute from "./routes/itemsroute";
import guffadiroutes from "./routes/guffadiroutes";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/items", itemsroute);
app.use("/guffadi", guffadiroutes);

// Error handler middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error received:", error);
  if (error.status === 404 || error.status === 400 || error.status === 403) {
    res.status(error.status).json({ error });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
