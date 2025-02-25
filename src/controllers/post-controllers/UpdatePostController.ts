import { Request, Response } from "express";
import { UpdatePostService } from "../../services/post-services/UpdatePostService";


export class UpdatePostController {
    async handle(request: Request, response: Response) {
        const { postId } = request.params
        const { content } = request.body

        const service = new UpdatePostService()

        const result = await service.execute({ postId, content })

        if (result === null) {
            response.status(404).json({message: "Post not Found!"})
            return
        }

        response.json(result)
    }
}