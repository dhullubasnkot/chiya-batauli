"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGuffgaff = exports.GetGuffadiById = exports.GetAllGuffadiHaru = void 0;
const guffadi_model_1 = require("../sql-models/guffadi-model");
const GetAllGuffadiHaru = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield guffadi_model_1.SqlGuffadiModel.getAllGuffadi();
    res.json(items);
});
exports.GetAllGuffadiHaru = GetAllGuffadiHaru;
const GetGuffadiById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const numericId = Number(id);
        const item = yield guffadi_model_1.SqlGuffadiModel.getGuffadiById(numericId);
        if (!item) {
            res.status(404).json({ message: "Guffadi not found" });
            return;
        }
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.GetGuffadiById = GetGuffadiById;
const createGuffgaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { author, content } = req.body;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!image) {
        res.status(400).json({ message: "Image upload failed." });
        return;
    }
    const imagePath = `/guffadi/${image}`;
    try {
        const newGuff = yield guffadi_model_1.SqlGuffadiModel.createGuffgaff(author, imagePath, content);
        res.status(200).json(newGuff);
        console.log(newGuff);
    }
    catch (error) {
        console.error("❌ Error creating guff:", error);
        res.status(500).json({ message: "Failed to create Guffgaff", error });
    }
});
exports.createGuffgaff = createGuffgaff;
