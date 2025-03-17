import { Router } from "express";
import { CreatePostController } from "../controllers/post-controllers/CreatePostController";
import { GetPostController } from "../controllers/post-controllers/GetPostController";
import { UpdatePostController } from "../controllers/post-controllers/UpdatePostController";
import { DeletePostController } from "../controllers/post-controllers/DeletePostController";
import multer from "multer";
import multerConfig from "../Config/multer";
import { GetUserPostsController } from "../controllers/post-controllers/GetUserPostsController";
import { GetPostReactionsController } from "../controllers/reaction-controllers/GetPostsReactionController";
import { CreateReactionController } from "../controllers/reaction-controllers/CreateReactionController";
import { DeleteReactionController } from "../controllers/reaction-controllers/DeleteReactionController";


const routes = Router()


routes.post("/create/:entityId?", multer(multerConfig).any(), new CreatePostController().handle);  // query?=type

// Event Reaction routes
routes.post("/reaction/:userId?", new CreateReactionController().handle)

routes.get("/reaction/:postId?", new GetPostReactionsController().handle)

routes.delete("/reaction/:userId?", new DeleteReactionController().handle)

routes.get("/:postId?", new GetPostController().handle);

routes.get("/user/:userId?", new GetUserPostsController().handle);

routes.put("/update/:postId?", new UpdatePostController().handle);

routes.delete("/delete/:postId?", new DeletePostController().handle);

export { routes }