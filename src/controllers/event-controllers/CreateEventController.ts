import { Request, Response } from "express";
import { CreateEventService } from "../../services/event-services/CreateEventService";
import { deleteFile } from "../../helpers/deleteFile";
import { ZodError } from "zod";
import { createEventInput, createEventSchema } from "../../Schema/createEventSchema";


export class CreateEventController {
    async handle(request: Request, response: Response) {

        const { userId } = request.params        
        
        try {
            if (!userId) {
                await deleteFile(String(request.file?.filename))
                response.status(400).json({message: "User id is required!"})
                return
            }

            const validatedData: createEventInput = createEventSchema.parse(request.body)

            const service = new CreateEventService()
    
            const result = await service.execute({
                name: validatedData.name,
                end_date: validatedData.end_date,
                start_date: validatedData.start_date,
                userId,
                location: validatedData.location,
                file_key: String(request.file?.filename),
                file_url: String(request.file?.path)
            })
    
            response.json(result)
            
        } catch (error: any) {
            if (error instanceof ZodError) {
                await deleteFile(String(request.file?.filename))
                response.status(400).json({error: `${error.errors[0].message}`})
            } else {
                await deleteFile(String(request.file?.filename))
                response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})
            }
        }

    }
}