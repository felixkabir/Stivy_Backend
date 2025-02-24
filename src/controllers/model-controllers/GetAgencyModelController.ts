import { Request, Response } from "express";
import { GetAgencyModelsService } from "../../services/model-services/GetAgencyModelsService";


export class GetAgencyModelsController {
    async handle(request: Request, response: Response) {
        const { agenceId } = request.params

        if (!agenceId) {
            response.status(400).json({message: "Agence Id is Required!"})
            return
        }

        const service = new GetAgencyModelsService()

        const result = await service.execute({ agenceId })

        response.json(result)
    }
}