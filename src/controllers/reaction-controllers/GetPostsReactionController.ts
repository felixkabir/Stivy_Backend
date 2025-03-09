import { Request, Response } from "express";
import { GetPostReactionsService } from "../../services/reaction-service/GetPostReactionsService";


export class GetPostReactionsController {
    async handle(request: Request, response: Response) {
        const { postId } = request.params

        if (!postId) {
            response.status(400).json({message: "Post id is required!"})
            return
        }

        const service = new GetPostReactionsService()

        const result = await service.execute(postId)

        response.json(result)
    }
}