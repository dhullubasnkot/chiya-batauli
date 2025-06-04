import express from "express";
import {
  createMenu,
  getAllItems,
  getItemById,
  searchItems,
} from "../controllers/items-controller";
import { betterUploader } from "../middlaware/multer";

const router = express.Router();

router.get("/", getAllItems);
router.get("/menu", searchItems);
router.get("/:id", (req, res, next) => {
  getItemById(req, res).catch(next);
});
router.post("/", betterUploader(), createMenu);

export default router;
