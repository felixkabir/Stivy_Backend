"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const CreateModelController_1 = require("../controllers/model-controllers/CreateModelController");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../Config/multer"));
const GetAgencyModelController_1 = require("../controllers/model-controllers/GetAgencyModelController");
const ListAllPlatformModelsController_1 = require("../controllers/model-controllers/ListAllPlatformModelsController");
const DeleteModelsFromAnAgencyController_1 = require("../controllers/model-controllers/DeleteModelsFromAnAgencyController");
const UpdateModelController_1 = require("../controllers/model-controllers/UpdateModelController");
const DeleteModelFileController_1 = require("../controllers/model-controllers/DeleteModelFileController");
const UploadModelFilesController_1 = require("../controllers/model-controllers/UploadModelFilesController");
const GetModelFilesController_1 = require("../controllers/model-controllers/GetModelFilesController");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.post("/add/:agencyId?", (0, multer_1.default)(multer_2.default).single("file"), new CreateModelController_1.CreateModelController().handle);
routes.post("/files/upload/:modelId?", (0, multer_1.default)(multer_2.default).any(), new UploadModelFilesController_1.UploadModelFilesController().handle);
routes.get("/agency-list/:agenceId?", new GetAgencyModelController_1.GetAgencyModelsController().handle);
routes.get("/", new ListAllPlatformModelsController_1.ListAllPlatformModelsController().handle);
routes.get("/files/:modelId?", new GetModelFilesController_1.GetModelFilesController().handle);
routes.put("/update/:modelId?", new UpdateModelController_1.UpdateModelController().handle);
routes.delete("/delete/:agencyId/:agencyOwnerId", new DeleteModelsFromAnAgencyController_1.DeleteModelsFromAnAgencyController().handle);
routes.delete("/files/delete/:modelId/:fileId", new DeleteModelFileController_1.DeleteModelFileController().handle);
