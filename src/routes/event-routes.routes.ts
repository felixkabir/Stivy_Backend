import { Router } from "express";
import { CreateEventController } from "../controllers/event-controllers/CreateEventController";
import multer from "multer";
import multerConfig from "../Config/multer";
import { UpdateEventController } from "../controllers/event-controllers/UpdateEventController";
import { DeleteEventController } from "../controllers/event-controllers/DeleteEventController";
import { GetEventsController } from "../controllers/event-controllers/GetEventsController";
import { GetAllUserEventsController } from "../controllers/event-controllers/GetAllUserEventsController";
import { CreateReactionController } from "../controllers/reaction-controllers/CreateReactionController";
import { GetAllAgencyEventsController } from "../controllers/event-controllers/GetAllAgencyEventsController";


const routes = Router()

routes.post("/create/:entityId?", multer(multerConfig).single("file"), new CreateEventController().handle);

// Event Reaction routes
routes.post("/reaction/:userId?", new CreateReactionController().handle)

routes.get("/all", new GetEventsController().handle)

routes.get("/user/all/:userId?", new GetAllUserEventsController().handle)
routes.get("/agency/all/:agencyId?", new GetAllAgencyEventsController().handle)

routes.put("/update/:eventId?", multer(multerConfig).single("file"), new UpdateEventController().handle)

routes.delete("/delete/:eventId?", new DeleteEventController().handle)

export { routes }