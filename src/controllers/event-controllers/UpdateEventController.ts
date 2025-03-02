import { Request, Response } from "express";
import { UpdateEventService } from "../../services/event-services/UpdateEventService";
import { deleteFile } from "../../helpers/deleteFile";


export class UpdateEventController {
    async handle(request: Request, response: Response) {

        const { eventId } = request.params
        const { name, end_date, start_date } = request.body

        try {
            if (!eventId) {
                await deleteFile(String(request.file?.filename))
                response.status(400).json({message: "Event id is required!"})
                return
            }
    
            const service = new UpdateEventService()
    
            const result = await service.execute({
                id: eventId,
                name,
                end_date,
                start_date,
                file_key: String(request.file?.filename),
                file_url: String(request.file?.path)
            })
    
            response.json(result)
            
        } catch (error: any) {
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})
        }
    }
}