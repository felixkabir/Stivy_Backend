import { Router } from "express";
import { LoginController } from "../controllers/auth-controllers/LoginController";
import { LogoutController } from "../controllers/auth-controllers/LogoutController";


const routes = Router()

routes.post("/user/login", new LoginController().handle)

routes.put("/user/logout", new LogoutController().handle)

export { routes }