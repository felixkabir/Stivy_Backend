import { Request, Response } from "express";
import { CreateRequestModelService } from "../../services/request-model-services/CreateRequestModelService";


export class CreateRequestModelController {
    async handle(request: Request, response: Response) {

        const { userId } = request.params

        try {
            if(!userId){
                response.status(400).json({message: "User Id is required!"})
                return
            }
            
            const service = new CreateRequestModelService()
    
            const result = await service.execute({})
    
            response.json(result)
            
        } catch (error: any) {
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})            
        }
    }
}