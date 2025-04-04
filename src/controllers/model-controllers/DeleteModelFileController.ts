import { Request, Response } from "express";
import { DeleteFileService } from "../../services/file-services/DeleteFileService";


export class DeleteModelFileController {
    async handle(request: Request, response: Response) {
        const { modelId, fileId } = request.params

        try {
            if (modelId && fileId) {
                const service = new DeleteFileService()
        
                const result = await service.execute({
                    entity_id: modelId,
                    file_id: fileId
                })
        
                response.json(result)
            } else {
                response.status(400).json({message: "${modelId}/${fileId} are required!"})
            }
            
        } catch (error: any) {
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})
        }
    }
}