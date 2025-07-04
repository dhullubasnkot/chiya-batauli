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
exports.SqlGuffadiModel = void 0;
const mysql_client_1 = __importDefault(require("./mysql-client"));
exports.SqlGuffadiModel = {
    getAllGuffadi() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield mysql_client_1.default.query("SELECT * FROM guffgaff");
            return rows;
        });
    },
    getGuffadiById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = (yield mysql_client_1.default.query("SELECT * FROM guffgaff WHERE id = ?", [
                id,
            ]));
            return rows[0];
        });
    },
    createGuffgaff(author, image, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield mysql_client_1.default.query("INSERT INTO guffgaff (author, image, content) VALUES (?, ?, ?)", [author, image, content]);
            console.log(result);
            return result;
        });
    },
};
