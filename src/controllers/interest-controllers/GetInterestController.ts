import { Request, Response } from "express";
import { GetinterestsService } from "../../services/interest-services/GetinterestsService";


export class GetinterestsController {
    async handle(request: Request, response: Response) {

        const service = new GetinterestsService()

        const result = await service.execute()

        response.json(result)
    }
}