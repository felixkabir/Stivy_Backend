import { Request, Response } from "express";
import { GetEventReactionsService } from "../../services/reaction-service/GetEventReactionsService";


export class GetEventsReactionsController {
    async handle(request: Request, response: Response) {
        const { eventId } = request.params

        if (!eventId) {
            response.status(400).json({message: "Event id is required!"})                
            return
        }

        const service = new GetEventReactionsService()

        const result = await service.execute(eventId)

        response.json(result)
    }
}