"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_controller_1 = require("../controllers/items-controller");
const multer_1 = require("../middlaware/multer");
const router = express_1.default.Router();
router.get("/", items_controller_1.getAllItems);
router.get("/menu", items_controller_1.searchItems);
router.get("/:id", (req, res, next) => {
    (0, items_controller_1.getItemById)(req, res).catch(next);
});
router.post("/", (0, multer_1.betterUploader)(), items_controller_1.createMenu);
exports.default = router;
