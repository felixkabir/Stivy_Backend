import { Request, Response } from "express";
import { UpdateModelService } from "../../services/model-services/UpdateModelService";
import { deleteFile } from "../../helpers/deleteFile";


export class UpdateModelController {
    async handle(request: Request, response: Response) {
        const { modelId } = request.params
        const { shoes, name, waist, height, contact } = request.body

        console.log('====================================');
        console.log(shoes, name, waist, height, contact);
        console.log('====================================');
        try {
            if (!modelId) {
                await deleteFile(String(request.file?.filename))
                response.status(400).json({message: "Model Id is Required!"})
                return
            }
    
            const service = new UpdateModelService()

            const result = await service.execute({
                id: modelId,
                shoes,
                name,
                waist,
                height,
                contact,
                file_key: request.file?.filename ? String(request.file?.filename) : undefined,
                file_url: request.file?.path ? String(request.file?.path) : undefined,
            })
    
            response.json(result)
            
        } catch (error: any) {
            await deleteFile(String(request.file?.filename))
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})
        }
    }
}