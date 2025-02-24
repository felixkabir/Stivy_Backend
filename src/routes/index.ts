import { Router } from "express";
import { routes as userRoutes } from "../routes/user-routes.routes";
import { routes as postRoutes } from "./post-routes.routes";
import { routes as authRoutes } from "./auth.routes";
import { routes as agencyRoutes } from "./agency-routes.routes";

const routes = Router()

// User Routes
routes.use("/users", userRoutes)


// Post Routes
routes.use("/post", postRoutes)

routes.use("/auth", authRoutes)

// Agency Routes
routes.use("/agency", agencyRoutes)

export { routes }