import { Request, Response } from "express";
import { DeleteAgencyService } from "../../services/agency-services/DeleteAgencyService";


export class DeleteAgencyController {
    async handle(request: Request, response: Response) {
        const { agenceId } = request.params

        try {
            if (!agenceId) {
                response.status(400).json({message: "Id is required!"})
                return
            }
            const service = new DeleteAgencyService()

            const result = await service.execute({
                agenceId,
            })

            response.json(result)
            
        } catch (error:any) {
            response.status(404).json({message: "Agency not found!"})            
        }
        
    }
}