"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const CreateAgencyController_1 = require("../controllers/agency-controllers/CreateAgencyController");
const GetAgencyController_1 = require("../controllers/agency-controllers/GetAgencyController");
const DeleteAgencyController_1 = require("../controllers/agency-controllers/DeleteAgencyController");
const GetUserAgencyController_1 = require("../controllers/agency-controllers/GetUserAgencyController");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../Config/multer"));
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.post("/create/:userId?", (0, multer_1.default)(multer_2.default).single("file"), new CreateAgencyController_1.CreateAgencyController().handle);
routes.get("/:agenceId?", new GetAgencyController_1.GetAgencyController().handle);
routes.get("/user/:userId?", new GetUserAgencyController_1.GetUserAgencyController().handle);
routes.delete("/delete/:agenceId?", new DeleteAgencyController_1.DeleteAgencyController().handle);
