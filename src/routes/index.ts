import { Router } from "express";
import { routes as userRoutes } from "../routes/user-routes.routes";

const routes = Router()

// User Routes
routes.use("/users", userRoutes)



export { routes }