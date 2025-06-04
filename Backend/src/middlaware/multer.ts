import multer from "multer";
import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";

export function betterUploader() {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadFolder = req.query.uploadDirectory || "default";
    const uploadPath = path.join(__dirname, `../../uploads/${uploadFolder}`);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
      },
    });

    const upload = multer({ storage }).single("image");

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({ message: "Upload error", error: err });
      }
      next();
    });
  };
}
