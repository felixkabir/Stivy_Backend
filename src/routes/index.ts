import { Router } from "express";
import { routes as userRoutes } from "../routes/user-routes.routes";
import { routes as postRoutes } from "./post-routes.routes";
import { routes as authRoutes } from "./auth.routes";
import { routes as agencyRoutes } from "./agency-routes.routes";
import { routes as modelRoutes } from "./model-routes.routes";
import { routes as notificationRoutes } from "./notification-routes.routes";
import { routes as eventRoutes } from "./event-routes.routes";

const routes = Router()

// User Routes
routes.use("/users", userRoutes)


// Post Routes
routes.use("/posts", postRoutes)

routes.use("/auth", authRoutes)

// Agency Routes
routes.use("/agency", agencyRoutes)

// ModelRoutes
routes.use("/models", modelRoutes)

// Notification Routes
routes.use("/notifications", notificationRoutes)

// Event Routes
routes.use("/events", eventRoutes)

export { routes }