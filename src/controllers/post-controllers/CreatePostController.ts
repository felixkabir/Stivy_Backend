import { Request, Response } from "express";
import { CreatePostService } from "../../services/post-services/CreatePostService";
import { deleteFile } from "../../helpers/deleteFile";
import { createPostInput, createPostSchema } from "../../Schema/createPostSchema";
import { ZodError } from "zod";


export class CreatePostController {
    async handle(request: Request, response: Response) {

        const { entityId } = request.params
        const { type } = request.query

        try {
            const service = new CreatePostService()

            const validatedData:createPostInput = createPostSchema.parse(request.body)

            const result = await service.execute({
                entityId,
                content: validatedData.content,
                type: String(type).toUpperCase(),
                files: request.files as any
            })
    
            if (!result) {
                const allFiles = request.files as any
    
                allFiles.forEach(async(file: Express.Multer.File) => {
                    await deleteFile(String(file.filename))
                });
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