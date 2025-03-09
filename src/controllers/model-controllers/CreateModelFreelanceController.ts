import { Request, Response } from "express";
import { deleteFile } from "../../helpers/deleteFile";
import { CreateModelFreelanceService } from "../../services/model-services/CreateModelFreelanceService";
import { ZodError } from "zod";


export class CreateModelFreelanceController {
    async handle(request: Request, response: Response) {
        
        try {            
            const { userId } = request.params

            if(!userId) {
                await deleteFile(String(request.file?.filename))
                response.status(400).json({message: "User Id is Required!"})
                return
            }
    
            const {
                waist,
                height,
                shoes,
                contact,
            } = request.body
    
            const service = new CreateModelFreelanceService()
    
            const result = await service.execute({
                userId,
                waist,
                contact,
                shoes,
                height,
            })
    
            if (result == null) {
                response.status(404).json({message: "User does not exist!"})
                return
            }
    
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