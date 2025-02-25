import { Request, Response } from "express";
import { GetAllUserEventsService } from "../../services/event-services/GetAllUserEventsService";


export class GetAllUserEventsController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        if(!userId) {
            response.status(400).json({message: "User id is required!"})
            return
        }
        
        const service = new GetAllUserEventsService()

        const result = await service.execute({ userId })

        response.json(result)
    }
}