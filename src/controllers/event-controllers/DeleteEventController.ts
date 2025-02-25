import { Request, Response } from "express";
import { DeleteEventService } from "../../services/event-services/DeleteEventService";


export class DeleteEventController {
    async handle(request: Request, response: Response) {
        const { eventId } = request.params

        const service = new DeleteEventService()

        const result = await service.execute({ eventId })

        response.json(result)
    }
}