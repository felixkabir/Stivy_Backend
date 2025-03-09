"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
// Define o diretório onde os arquivos serão armazenados
const uploadsDest = (0, path_1.resolve)(__dirname, "../Files");
const checkIfPathExistToCreate = () => {
    const existPath = fs_1.default.existsSync(uploadsDest);
    if (!existPath) {
        fs_1.default.mkdirSync(uploadsDest);
    }
};
const storage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        checkIfPathExistToCreate();
        cb(null, uploadsDest); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        // Usando o nome original do arquivo e adicionando um timestamp
        cb(null, `stivy_${Date.now()}-${file.originalname}`);
    }
});
const multerConfig = {
    storage,
    limits: {
        fileSize: 30 * 1024 * 1024, // 30MB
    },
};
exports.default = multerConfig;
