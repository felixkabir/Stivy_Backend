import { Router } from "express";
import { CreatePostController } from "../controllers/post-controllers/CreatePostController";
import { GetPostController } from "../controllers/post-controllers/GetPostController";
import { UpdatePostController } from "../controllers/post-controllers/UpdatePostController";
import { DeletePostController } from "../controllers/post-controllers/DeletePostController";
import multer from "multer";
import multerConfig from "../Config/multer";
import { GetUserPostsController } from "../controllers/post-controllers/GetUserPostsController";


const routes = Router()


routes.post("/create/:entityId?", multer(multerConfig).any(), new CreatePostController().handle);  // query?=type

routes.get("/:postId?", new GetPostController().handle);

routes.get("/user/:userId?", new GetUserPostsController().handle);

routes.put("/update/:postId?", new UpdatePostController().handle);

routes.delete("/delete/:postId?", new DeletePostController().handle);

export { routes }