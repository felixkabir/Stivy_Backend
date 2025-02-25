import { Request, Response } from "express";
import { CreateEventService } from "../../services/event-services/CreateEventService";
import { deleteFile } from "../../helpers/deleteFile";


export class CreateEventController {
    async handle(request: Request, response: Response) {

        const { userId } = request.params
        const { name, end_date, start_date } = request.body

        if (!userId) {
            await deleteFile(String(request.file?.filename))
            response.status(400).json({message: "User id is required!"})
            return
        }

        const service = new CreateEventService()

        const result = await service.execute({
            name,
            end_date,
            start_date,
            userId,
            file_key: String(request.file?.filename),
            file_url: String(request.file?.path)
        })

        response.json(result)
    }
}