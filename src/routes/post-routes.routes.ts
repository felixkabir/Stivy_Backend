import { Router } from "express";
import { CreatePostController } from "../controllers/post-controllers/CreatePostController";

const routes = Router()


routes.post("/create/:entityId?", new CreatePostController().handle);  // query?


export { routes }