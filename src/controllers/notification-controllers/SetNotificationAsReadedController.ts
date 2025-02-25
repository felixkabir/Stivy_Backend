import { Request, Response } from "express";
import { SetNotificationAsReadedService } from "../../services/notification-services/SetNotificationAsReadedService";


export class SetNotificationAsReadedController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new SetNotificationAsReadedService()

        const result = await service.execute({ userId })

        response.json(result)
    }
}