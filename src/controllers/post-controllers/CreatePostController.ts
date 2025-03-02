import { Request, Response } from "express";
import { CreatePostService } from "../../services/post-services/CreatePostService";
import { deleteFile } from "../../helpers/deleteFile";


export class CreatePostController {
    async handle(request: Request, response: Response) {

        const { entityId } = request.params
        const { content } = request.body
        const { type } = request.query

        const service = new CreatePostService()

        const result = await service.execute({
            entityId,
            content,
            type: String(type).toUpperCase(),
            files: request.files as any
        })

        if (!result) {
            const allFiles = request.files as any

            allFiles.forEach(async(file: Express.Multer.File) => {
                await deleteFile(String(file.filename))
                console.log("File eliminada")
            });
        }

        response.json(result)
    }
}