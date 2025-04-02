import { Request, Response } from "express";
import { GetAllAgencyEventsService } from "../../services/event-services/GetAllAgencyEventsService";


export class GetAllAgencyEventsController {
    async handle(request: Request, response: Response) {
        const { agencyId } = request.params

        if(!agencyId) {
            response.status(400).json({message: "Agency id is required!"})
            return
        }
        
        const service = new GetAllAgencyEventsService()

        const result = await service.execute({ agencyId })

        response.json(result)
    }
}