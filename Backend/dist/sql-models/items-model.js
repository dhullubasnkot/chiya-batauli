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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlItemsModel = void 0;
const mysql_client_1 = __importDefault(require("./mysql-client"));
exports.SqlItemsModel = {
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield mysql_client_1.default.query("SELECT * FROM menu");
            return rows;
        });
    },
    getItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield mysql_client_1.default.query("SELECT * FROM menu WHERE id = ?", [id]);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        });
    },
    searchItems(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchTerm = `%${query.toLowerCase()}%`;
            const [rows] = yield mysql_client_1.default.query(`SELECT * FROM menu WHERE 
      LOWER(name) LIKE ? OR 
      LOWER(category) LIKE ? OR 
      LOWER(ingredients) LIKE ?`, [searchTerm, searchTerm, searchTerm]);
            return rows;
        });
    },
    createMenuItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, image, category, ingredients, description, isAvailable, } = item;
            const [result] = yield mysql_client_1.default.query(`INSERT INTO menu (name, price, image, category, ingredients, description, isAvailable)
       VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, price, image, category, ingredients, description, isAvailable]);
            return result;
        });
    },
};
