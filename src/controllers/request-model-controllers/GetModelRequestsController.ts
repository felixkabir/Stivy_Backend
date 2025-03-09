import { Request, Response } from "express";
import { GetModelRequestsService } from "../../services/request-model-services/GetModelRequestService";


export class GetModelRequestsController {
    async handle(request: Request, response: Response) {
        const { modelId } = request.params

        try {
            if (!modelId) {
                response.status(400).json({message: "Model id is Required."})
                return
            }
            
            const service = new GetModelRequestsService()
    
            const result = await service.execute({ modelId })

            response.json(result)

        } catch (error: any) {
            response.status(400).json({message: `Ocorreu um erro inesperado: ${error}`})
        }
    }
}