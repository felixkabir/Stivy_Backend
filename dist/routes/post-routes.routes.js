"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const CreatePostController_1 = require("../controllers/post-controllers/CreatePostController");
const GetPostController_1 = require("../controllers/post-controllers/GetPostController");
const UpdatePostController_1 = require("../controllers/post-controllers/UpdatePostController");
const DeletePostController_1 = require("../controllers/post-controllers/DeletePostController");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../Config/multer"));
const GetUserPostsController_1 = require("../controllers/post-controllers/GetUserPostsController");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.post("/create/:entityId?", (0, multer_1.default)(multer_2.default).any(), new CreatePostController_1.CreatePostController().handle); // query?=type
routes.get("/:postId?", new GetPostController_1.GetPostController().handle);
routes.get("/user/:userId?", new GetUserPostsController_1.GetUserPostsController().handle);
routes.put("/update/:postId?", new UpdatePostController_1.UpdatePostController().handle);
routes.delete("/delete/:postId?", new DeletePostController_1.DeletePostController().handle);
