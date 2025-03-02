import { Request, Response } from "express";
import { UpdateModelService } from "../../services/model-services/UpdateModelService";


export class UpdateModelController {
    async handle(request: Request, response: Response) {
        const { modelId } = request.params
        const { shoes, name, waist, height, contact } = request.body

        try {
            if (!modelId) {
                response.status(400).json({message: "Model Id is Required!"})
                return
            }
    
            const service = new UpdateModelService()
    
            const result = await service.execute({
                id: modelId,
                shoes,
                name,
                waist,
                height,
                contact
            })
    
            response.json(result)
            
        } catch (error: any) {
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})
        }
    }
}