import { Request, Response } from "express";
import { CreateModelService } from "../../services/model-services/CreateModelService";
import { deleteFile } from "../../helpers/deleteFile";
import { createModelInput, createModelSchema } from "../../Schema/createModelSchema";
import { ZodError } from "zod";


export class CreateModelController {
    async handle(request: Request, response: Response) {
        const { agencyId } = request.params

        try {
            
            if(!agencyId) {
                await deleteFile(String(request.file?.filename))
                response.status(400).json({message: "Agency Id is Required!"})
                return
            }

            const validatedData: createModelInput = createModelSchema.parse(request.body)
    
            const {
                name,
                waist,
                height,
                shoes,
                contact,
                userId
            } = validatedData
    
            const service = new CreateModelService()

    
            const result = await service.execute({
                agencyId,
                userId,
                name,
                waist,
                contact,
                shoes,
                height,
                file_key: String(request.file?.filename),
                file_url: String(request.file?.path),
            })
    
            if (result == null) {
                await deleteFile(String(request.file?.filename))
                response.status(404).json({message: "Agency does not exist!"})
                return
            }
    
            response.json(result)
        } catch (error: any) {
            if (error instanceof ZodError) {
                response.status(400).json({error: `${error.errors[0].message}`})
            } else {                
                response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})
            }
        }
    }
}