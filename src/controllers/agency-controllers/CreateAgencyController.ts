import { Request, Response } from "express";
import { CreateAgencyService } from "../../services/agency-services/CreateAgencyService";
import { deleteFile } from "../../helpers/deleteFile";


export class CreateAgencyController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params
        const { name, contact } = request.body

        if (!userId) {
            await deleteFile(String(request.file?.filename))
            response.status(400).json({message: "Id is required!"})
            return                
        }

        if (name.length > 0 && contact.length > 0) {
            const service = new CreateAgencyService()
    
            const result = await service.execute({
                userId: String(userId),
                name,
                contact,
                file_key: String(request.file?.filename),
                file_url: String(request.file?.path)
            })
            
            response.json(result)
            return            
        } else {
            response.status(400).json({message: "Por favor, preencha todos os campos."})
        }

    }
}