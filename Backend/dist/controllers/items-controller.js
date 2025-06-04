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
exports.createMenu = exports.searchItems = exports.getItemById = exports.getAllItems = void 0;
const items_model_1 = require("../sql-models/items-model");
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield items_model_1.SqlItemsModel.getAllItems();
    res.json(items);
});
exports.getAllItems = getAllItems;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const item = yield items_model_1.SqlItemsModel.getItemById(Number(id));
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        return res.json(item);
    }
    catch (err) {
        console.error("Error fetching item by ID:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getItemById = getItemById;
const searchItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        if (typeof query !== "string" || !query.trim()) {
            res.status(400).json({ message: "Query parameter is required" });
            return;
        }
        const items = yield items_model_1.SqlItemsModel.searchItems(query);
        res.json(items);
        return;
    }
    catch (err) {
        console.error("Error searching items:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.searchItems = searchItems;
const createMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, price, category, ingredients, description, isAvailable } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const numericPrice = parseFloat(price);
        const available = isAvailable === "true" || isAvailable === "on";
        const ingredientsArray = typeof ingredients === "string"
            ? ingredients.split(",").map((item) => item.trim())
            : [];
        if (typeof name !== "string" ||
            isNaN(numericPrice) ||
            typeof category !== "string" ||
            typeof description !== "string" ||
            !Array.isArray(ingredientsArray) ||
            !image) {
            res.status(400).json({ message: "Invalid input data" });
            return;
        }
        const imagePath = `/${category}/${image}`;
        const newItem = yield items_model_1.SqlItemsModel.createMenuItem({
            name,
            price: numericPrice,
            image: imagePath,
            category,
            ingredients: JSON.stringify(ingredientsArray),
            description,
            isAvailable: available,
        });
        res.status(200).json(newItem);
    }
    catch (err) {
        console.error("Error creating menu item:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createMenu = createMenu;
