import { Request, Response } from "express";
import { GetUserNotificationsService } from "../../services/notification-services/GetUserNotificationsService";


export class GetUserNotificationsController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new GetUserNotificationsService()

        const result = await service.execute({ userId })

        response.json(result)
    }
}