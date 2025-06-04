"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.betterUploader = betterUploader;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function betterUploader() {
    return (req, res, next) => {
        const uploadFolder = req.query.uploadDirectory || "default";
        const uploadPath = path_1.default.join(__dirname, `../../uploads/${uploadFolder}`);
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        }
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = path_1.default.extname(file.originalname);
                cb(null, file.fieldname + "-" + uniqueSuffix + ext);
            },
        });
        const upload = (0, multer_1.default)({ storage }).single("image");
        upload(req, res, function (err) {
            if (err instanceof multer_1.default.MulterError) {
                return res.status(400).json({ message: "Multer error", error: err });
            }
            else if (err) {
                return res.status(500).json({ message: "Upload error", error: err });
            }
            next();
        });
    };
}
