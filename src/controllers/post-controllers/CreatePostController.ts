import { Request, Response } from "express";
import { CreatePostService } from "../../services/post-services/CreatePostService";


export class CreatePostController {
    async handle(request: Request, response: Response) {
        const { entityId } = request.params
        const { content } = request.body
        const { type } = request.query

        if (!entityId) {
            response.status(400).json({message: "Id da entidade e obrigatorio!"})
            return
        }

        const service = new CreatePostService()

        const result = await service.execute({ entityId, content, type: String(type)})

        response.json(result)
    }
}