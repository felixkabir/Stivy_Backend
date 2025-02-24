import { Request, Response } from "express";
import { ListAllPlatformModelsService } from "../../services/model-services/ListAllPlatformModelsService";


export class ListAllPlatformModelsController {
    async handle(request: Request, response: Response) {
        const service = new ListAllPlatformModelsService()

        const result = await service.execute()

        response.json(result)
    }
}