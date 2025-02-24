import { Request, Response } from "express";
import { GetAgencyService } from "../../services/agency-services/GetAgencyService";


export class GetAgencyController {
    async handle(request: Request, response: Response) {
        const { agenceId } = request.params

        const service = new GetAgencyService()

        const result = await service.execute({ agenceId })

        if (result === null) {
            response.status(404).json({message: "Agence not found!"})
            return
        }

        response.json(result)
    }
}