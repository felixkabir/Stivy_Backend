import { Request, Response } from "express";
import { DeleteModelsFromAnAgencyService } from "../../services/model-services/DeleteModelsFromAnAgencyService";



export class DeleteModelsFromAnAgencyController {
    async handle(request: Request, response: Response) {
        const { agencyId, agencyOwnerId } = request.params

        if (agencyId && agencyOwnerId) {
            const { model_ids } = request.body
    
            const service = new DeleteModelsFromAnAgencyService()
    
            const result = await service.execute({
                agencyId,
                agencyOwnerId,
                model_ids
            })

            if (result === null) {
                response.status(400).json({message: "Id da agencia ou do proprietario invalido!"})
                return
            }
    
            response.json(result)            
        } else {
            response.status(400).json({message: "Agency Id is required, as well as the owner Id."})
        }

    }
}