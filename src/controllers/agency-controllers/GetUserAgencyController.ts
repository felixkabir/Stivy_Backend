import { Request, Response } from "express";
import { GetUserAgencyService } from "../../services/agency-services/GetUserAgencyService";


export class GetUserAgencyController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        if (!userId) {
            response.status(400).json({message: "User id is required to get all User agencies."})
            return 
        }

        const service = new GetUserAgencyService()

        const result = await service.execute({ userId })

        response.json(result)
    }
}