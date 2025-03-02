import { Request, Response } from "express";
import { deleteFile } from "../../helpers/deleteFile";
import { UploadModelFilesService } from "../../services/model-services/UploadModelFilesService";


export class UploadModelFilesController {
    async handle(request: Request, response: Response) {
        const { modelId } = request.params
        const { title } = request.body
        
        try {
            if (!modelId) {
                const allFiles = request.files as any
    
                allFiles.forEach(async(file: Express.Multer.File) => {
                    await deleteFile(String(file.filename))
                });
                response.status(400).json({message: "Model Id is required"})
            }

            const service = new UploadModelFilesService()

            const result = await service.execute({
                modelId,
                content: title,
                files: request.files as any
            })

            if (result === null) {
                const allFiles = request.files as any
    
                allFiles.forEach(async(file: Express.Multer.File) => {
                    await deleteFile(String(file.filename))
                });
            }

            response.json(result)

        } catch (error: any) {
            const allFiles = request.files as any
    
            allFiles.forEach(async(file: Express.Multer.File) => {
                await deleteFile(String(file.filename))
            });
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})            
        }
    }
}