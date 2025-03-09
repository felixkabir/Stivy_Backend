"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = deleteFile;
const node_fs_1 = __importDefault(require("node:fs"));
const node_util_1 = require("node:util");
const path_1 = require("path");
async function deleteFile(file_name) {
    if (!file_name)
        return;
    try {
        return await (0, node_util_1.promisify)(node_fs_1.default.unlink)((0, path_1.resolve)(__dirname, "../Files/", file_name));
    }
    catch (err) {
        // console.log(err)
    }
}
