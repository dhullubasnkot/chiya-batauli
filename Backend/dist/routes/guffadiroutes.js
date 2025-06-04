"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guffadi_controller_1 = require("../controllers/guffadi-controller");
const guffmulter_1 = __importDefault(require("../middlaware/guffmulter"));
const router = express_1.default.Router();
router.get("/", guffadi_controller_1.GetAllGuffadiHaru);
router.get("/:id", guffadi_controller_1.GetGuffadiById);
router.post("/", guffmulter_1.default.single("image"), guffadi_controller_1.createGuffgaff);
exports.default = router;
