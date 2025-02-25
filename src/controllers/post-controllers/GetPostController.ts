import { Request, Response } from "express";
import { GetPostService } from "../../services/post-services/GetPostService";


export class GetPostController {
    async handle(request: Request, response: Response) {
        const { postId } = request.params

        const service = new GetPostService()

        const result = await service.execute({ postId })

        if (result === null) {
            response.status(404).json({message: "Post does not exist!"})
            return
        }

        response.json(result)
    }
}