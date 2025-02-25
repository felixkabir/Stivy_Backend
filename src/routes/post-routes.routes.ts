import { Router } from "express";
import { CreatePostController } from "../controllers/post-controllers/CreatePostController";
import { GetPostController } from "../controllers/post-controllers/GetPostController";
import { UpdatePostController } from "../controllers/post-controllers/UpdatePostController";
import { DeletePostController } from "../controllers/post-controllers/DeletePostController";

const routes = Router()


routes.post("/create/:entityId?", new CreatePostController().handle);  // query?=type

routes.get("/:postId?", new GetPostController().handle)

routes.put("/update/:postId", new UpdatePostController().handle)

routes.delete("/delete/:postId?", new DeletePostController().handle)

export { routes }