import { Request, Response } from "express";
import { CountUserUnreadedNotificationsService } from "../../services/notification-services/CountUserUnreadedNotificationsService";


export class CountUserUnreadedNotificationsController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        if (!userId) {
            response.status(400).json({message: "User Id is required!"})
            return
        }

        const service = new CountUserUnreadedNotificationsService()

        const result = await service.execute({ userId })

        response.json(result)
    }
}