import { Router } from "express";
import { CreateUserController } from "../controllers/user-controllers/CreateUserController";
import { GetUserController } from "../controllers/user-controllers/GetUserController";
import { UpdateUserController } from "../controllers/user-controllers/UpdateUserController";
import { DeleteUserController } from "../controllers/user-controllers/DeleteUserController";
import multer from "multer";
import multerConfig from "../Config/multer";


const routes = Router()

routes.post("/create", multer(multerConfig).single("file"), new CreateUserController().handle)

routes.get("/:userId?", new GetUserController().handle)

routes.put("/update/:userId?", new UpdateUserController().handle)

routes.delete("/delete/:userId?", new DeleteUserController().handle)

export { routes }