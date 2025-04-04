"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const CreateEventController_1 = require("../controllers/event-controllers/CreateEventController");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../Config/multer"));
const UpdateEventController_1 = require("../controllers/event-controllers/UpdateEventController");
const DeleteEventController_1 = require("../controllers/event-controllers/DeleteEventController");
const GetEventsController_1 = require("../controllers/event-controllers/GetEventsController");
const GetAllUserEventsController_1 = require("../controllers/event-controllers/GetAllUserEventsController");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.post("/create/:userId?", (0, multer_1.default)(multer_2.default).single("file"), new CreateEventController_1.CreateEventController().handle);
routes.get("/all", new GetEventsController_1.GetEventsController().handle);
routes.get("/user/all/:userId?", new GetAllUserEventsController_1.GetAllUserEventsController().handle);
routes.put("/update/:eventId?", (0, multer_1.default)(multer_2.default).single("file"), new UpdateEventController_1.UpdateEventController().handle);
routes.delete("/delete/:eventId?", new DeleteEventController_1.DeleteEventController().handle);
