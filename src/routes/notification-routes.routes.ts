import { Router } from "express";
import { SetNotificationAsReadedController } from "../controllers/notification-controllers/SetNotificationAsReadedController";
import { CountUserUnreadedNotificationsController } from "../controllers/notification-controllers/CountUserUnreadedNotificationsController";


const routes = Router()

routes.put("/set-as-readed/:userId", new SetNotificationAsReadedController().handle)

routes.get("/unread/:userId?", new CountUserUnreadedNotificationsController().handle)

export { routes }