import { Request, Response } from "express";
import { GetAgencyModelRequestService } from "../../services/request-model-services/GetAgencyModelRequestService";



export class GetAgencyModelRequestController {
    async handle(request: Request, response: Response) {
        try {
            const { agencyId } = request.params

            if (!agencyId) {
                response.status(400).json({error: "Agency Id is required!"})
                return
            }

            const service = new GetAgencyModelRequestService()

            const result = await service.execute({agencyId})

            response.json(result)
        } catch (error: any) {
            response.status(400).json({error: `Ocorreu um erro inesperado: ${error}`})            
        }
    }
}