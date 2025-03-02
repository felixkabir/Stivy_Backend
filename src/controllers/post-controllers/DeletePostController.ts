import { Request, Response } from "express";
import { DeletePostService } from "../../services/post-services/DeletePostService";


export class DeletePostController {
    async handle(request: Request, response: Response) {
        const { postId } = request.params

        try {
            if (!postId) {
                response.status(400).json({message: "Post Id is required."})
                return
            }
    
            const service = new DeletePostService()
    
            const result = await service.execute({ postId })
    
            if (result !== null) {
                response.json(result)
                return
            }
    
            response.status(404).json({message:"Post does not exist!"})
            
        } catch (error: any) {
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})            
        }
    }
}