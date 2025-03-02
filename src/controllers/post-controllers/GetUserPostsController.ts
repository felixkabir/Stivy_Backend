import { Request, Response } from "express";
import { GetUserPostsService } from "../../services/post-services/GetUserPostsService";


export class GetUserPostsController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        if (!userId) {
            response.status(400).json({message: "User Id is required."})
            return
        }

        const service = new GetUserPostsService()

        const result = await service.execute({ userId })

        response.json(result)
    }
}