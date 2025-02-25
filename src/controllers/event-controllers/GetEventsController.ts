import { Request, Response } from "express";
import { GetEventsService } from "../../services/event-services/GetEventsService";


export class GetEventsController {
    async handle(request: Request, response: Response) {

        const service = new GetEventsService()

        const result = await service.execute()

        response.json(result)
    }
}