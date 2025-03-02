import { Request, Response } from "express";
import { UpdatePostService } from "../../services/post-services/UpdatePostService";


export class UpdatePostController {
    async handle(request: Request, response: Response) {
        const { postId } = request.params
        const { content } = request.body

        try {
            
            if (!postId) {
                response.json({message: "Post id is required to update."})
                return
            }
    
            const service = new UpdatePostService()
    
            const result = await service.execute({ postId, content })
    
            if (result === null) {
                response.status(404).json({message: "Post not Found!"})
                return
            }
    
            response.json(result)
        } catch (error: any) {
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})            
        }

    }
}