"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("../controllers/user-controllers/CreateUserController");
const GetUserController_1 = require("../controllers/user-controllers/GetUserController");
const UpdateUserController_1 = require("../controllers/user-controllers/UpdateUserController");
const DeleteUserController_1 = require("../controllers/user-controllers/DeleteUserController");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../Config/multer"));
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.post("/create", (0, multer_1.default)(multer_2.default).single("file"), new CreateUserController_1.CreateUserController().handle);
routes.get("/:userId?", new GetUserController_1.GetUserController().handle);
routes.put("/update/:userId?", new UpdateUserController_1.UpdateUserController().handle);
routes.delete("/delete/:userId?", new DeleteUserController_1.DeleteUserController().handle);
