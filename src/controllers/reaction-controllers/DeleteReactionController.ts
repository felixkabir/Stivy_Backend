import { Request, Response } from "express";
import { DeleteReactionService } from "../../services/reaction-service/DeleteReactionService";


export class DeleteReactionController {
    async handle(request: Request, response: Response) {
        try {
            const { userId } = request.params
            const { postId, eventId } = request.body

            if (!userId) {
                response.status(400).json({message: "User id is required!"})                
                return
            }

            const service = new DeleteReactionService()

            const result = await service.execute({
                userId,
                postId,
                eventId
            })

            if (result.count < 1) {
                response.status(200).json({message:'Não Reacao deste Usuario', result:result})
            } else {
                response.status(200).json({message:'Reação Eliminada com sucesso', result:result})
            }
        } catch (error: any) {
            response.status(400).json({error: "Ocorreu um erro inesperado."})
        }
    }
}