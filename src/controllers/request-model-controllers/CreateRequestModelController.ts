import { Request, Response } from "express";
import { CreateRequestModelService } from "../../services/request-model-services/CreateRequestModelService";
import { createRequestModelInput, createRequestModelSchema } from "../../Schema/createRequestModelSchema";
import { ZodError } from "zod";


export class CreateRequestModelController {
    async handle(request: Request, response: Response) {

        try {
            const { userId } = request.params
        
            if(!userId){
                response.status(400).json({message: "User Id is required!"})
                return
            }

            const validatedData: createRequestModelInput = createRequestModelSchema.parse(request.body)
            
            const service = new CreateRequestModelService()
    
            const result = await service.execute({
                userId,
                modelId: validatedData.modelId,
                agencyId: validatedData.agencyId
            })
    
            response.json(result)
            
        } catch (error: any) {
            if (error instanceof ZodError) {
                response.status(400).json({error: `${error.errors[0].message}`})
            } else {                
                response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})            
            }
        }
    }
}