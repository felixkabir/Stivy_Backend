import { Router } from "express";
import { CreateAgencyController } from "../controllers/agency-controllers/CreateAgencyController";
import { GetAgencyController } from "../controllers/agency-controllers/GetAgencyController";
import { DeleteAgencyController } from "../controllers/agency-controllers/DeleteAgencyController";
import { GetUserAgencyController } from "../controllers/agency-controllers/GetUserAgencyController";
import multer from "multer";
import multerConfig from "../Config/multer";


const routes = Router()

routes.post("/create/:userId?", multer(multerConfig).single("file"), new CreateAgencyController().handle)

routes.get("/:agenceId?", new GetAgencyController().handle)

routes.get("/user/:userId?", new GetUserAgencyController().handle)

routes.delete("/delete/:agenceId?", new DeleteAgencyController().handle)

export { routes }