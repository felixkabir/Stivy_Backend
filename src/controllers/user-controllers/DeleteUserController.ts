import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user-services/DeleteUserService";


export class DeleteUserController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params
        
        try {
            if (!userId) {
                response.status(400).json({message: "Id is required!"})
                return                
            }
            const service = new DeleteUserService()
    
            const result = await service.execute({ userId })
    
            response.json(result)
            
        } catch (error: any) {
            response.status(404).json({message: "User to delete does not exist!"})
        }
    }
}