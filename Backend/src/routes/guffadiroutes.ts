import express from "express";
import {
  GetAllGuffadiHaru,
  GetGuffadiById,
  createGuffgaff,
} from "../controllers/guffadi-controller";
import guffmulter from "../middlaware/guffmulter";

const router = express.Router();

router.get("/", GetAllGuffadiHaru);
router.get("/:id", GetGuffadiById);
router.post("/", guffmulter.single("image"), createGuffgaff);
export default router;
