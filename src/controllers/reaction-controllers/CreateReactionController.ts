import { Request, Response } from "express";
import { CreateReactionService } from "../../services/reaction-service/CreateReactionService";


export class CreateReactionController {
    async handle(request: Request, response: Response) {
        try {
            const { userId } = request.params
            const { postId, eventId } = request.body

            if (!userId) {
                response.status(400).json({message: "User id is required!"})                
                return
            }

            const service = new CreateReactionService()

            const result = await service.execute({
                userId,
                postId,
                eventId
            })

            response.json(result)
        } catch (error: any) {
            response.status(400).json({error: "Ocorreu um erro inesperado."})
        }
    }
}