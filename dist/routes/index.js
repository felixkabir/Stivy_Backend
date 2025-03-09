"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const user_routes_routes_1 = require("../routes/user-routes.routes");
const post_routes_routes_1 = require("./post-routes.routes");
const auth_routes_1 = require("./auth.routes");
const agency_routes_routes_1 = require("./agency-routes.routes");
const model_routes_routes_1 = require("./model-routes.routes");
const notification_routes_routes_1 = require("./notification-routes.routes");
const event_routes_routes_1 = require("./event-routes.routes");
const routes = (0, express_1.Router)();
exports.routes = routes;
// User Routes
routes.use("/users", user_routes_routes_1.routes);
// Post Routes
routes.use("/posts", post_routes_routes_1.routes);
routes.use("/auth", auth_routes_1.routes);
// Agency Routes
routes.use("/agency", agency_routes_routes_1.routes);
// ModelRoutes
routes.use("/models", model_routes_routes_1.routes);
// Notification Routes
routes.use("/notifications", notification_routes_routes_1.routes);
// Event Routes
routes.use("/events", event_routes_routes_1.routes);
