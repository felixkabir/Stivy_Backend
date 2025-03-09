import { Router } from "express";
import { GetinterestsController } from "../controllers/interest-controllers/GetInterestController";


const routes = Router()


routes.get("/", new GetinterestsController().handle)

export { routes }