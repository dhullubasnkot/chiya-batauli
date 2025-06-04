"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemsroute_1 = __importDefault(require("./routes/itemsroute"));
const guffadiroutes_1 = __importDefault(require("./routes/guffadiroutes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 4000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Serve uploaded images
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Routes
app.use("/items", itemsroute_1.default);
app.use("/guffadi", guffadiroutes_1.default);
// Error handler middleware
app.use((error, req, res, next) => {
    console.log("Error received:", error);
    if (error.status === 404 || error.status === 400 || error.status === 403) {
        res.status(error.status).json({ error });
    }
    else {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
