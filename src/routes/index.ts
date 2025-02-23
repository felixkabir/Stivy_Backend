import { Router } from "express";
import { routes as userRoutes } from "../routes/user-routes.routes";
import { routes as postRoutes } from "./post-routes.routes";

const routes = Router()

// User Routes
routes.use("/users", userRoutes)


// Post Routes
routes.use("/post", postRoutes)

export { routes }