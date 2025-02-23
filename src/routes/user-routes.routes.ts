import { Router } from "express";
import { CreateUserController } from "../controllers/user-controllers/CreateUserController";
import upload from "../Config/multer";
import { GetUserController } from "../controllers/user-controllers/GetUserController";
import { UpdateUserController } from "../controllers/user-controllers/UpdateUserController";


const routes = Router()

routes.post("/create",upload.single("file"), new CreateUserController().handle)

routes.get("/:userId?", new GetUserController().handle)

routes.put("/update/:userId", new UpdateUserController().handle)

export { routes }