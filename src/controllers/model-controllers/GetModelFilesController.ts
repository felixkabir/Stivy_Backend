import { Request, Response } from "express";
import { GetModelFilesService } from "../../services/model-services/GetModelFilesService";


export class GetModelFilesController {
    async handle(request: Request, response: Response) {
        const { modelId } = request.params

        if (!modelId) {
            response.status(400).json({message: "Model Id is required!"})
            return
        }

        const service = new GetModelFilesService()

        const result = await service.execute({ modelId })

        if (result === null) {
            response.status(404).json({message: "Model does not exist."})
            return
        }

        response.json(result)
    }
}