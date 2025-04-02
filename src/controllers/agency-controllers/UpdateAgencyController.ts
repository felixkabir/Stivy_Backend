import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user-services/UpdateUserService";
import { deleteFile } from "../../helpers/deleteFile";
import { validate } from "uuid";
import { generateHashPassword } from "../../helpers/generateHashPassword";
import { UpdateAgencyInput, updateAgencySchema, UpdateUserInput, updateUserSchema } from "../../Schema/createUserSchema";
import { UpdateAgencyService } from "../../services/agency-services/UpdateAgencyService";

export class UpdateAgencyController {
    async handle(request: Request, response: Response) {
        const { agencyId } = request.params
        const { contact, name } = request.body

        const service = new UpdateAgencyService()

        try {
            if (!agencyId) {
                deleteFile(String(request.file?.filename))
                response.status(400).json({message: "Please, enter the agency id to update"})
                return
            }
    
            if(agencyId && !validate(agencyId)) {
                deleteFile(String(request.file?.filename))
                response.status(400).json({message: "Invalid agency id!"})
                return
            }
    
            const dataToValidate = {
                ...(name !== undefined && { name }),
                ...(contact !== undefined && { contact }), 
            };
            
            const validatedData: UpdateAgencyInput = updateAgencySchema.parse(dataToValidate);
            
            const updateData = {
                id: agencyId,
                ...(validatedData.name !== undefined && { name: validatedData.name }),
                ...(validatedData.contact !== undefined && { contact: validatedData.contact }), 
            };
            
            const result = await service.execute(updateData);
    
            response.json(result);
        } catch (error: any) {
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})
        }
    }
}