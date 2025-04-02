import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user-services/UpdateUserService";
import { deleteFile } from "../../helpers/deleteFile";
import { validate } from "uuid";
import { generateHashPassword } from "../../helpers/generateHashPassword";
import { UpdateUserInput, updateUserSchema } from "../../Schema/createUserSchema";

export class UpdateUserController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params
        const { email, username, password, interest_types } = request.body

        const service = new UpdateUserService()

        try {
            if (!userId) {
                deleteFile(String(request.file?.filename))
                response.status(400).json({message: "Please, enter the user id to update"})
                return
            }
    
            if(userId && !validate(userId)) {
                deleteFile(String(request.file?.filename))
                response.status(400).json({message: "Invalid user id!"})
                return
            }
    
            const dataToValidate = {
                ...(email !== undefined && { email }),
                ...(username !== undefined && { username }),
                ...(password !== undefined && { password }),
                ...(interest_types !== undefined && { interest_types })
            };
            
            const validatedData: UpdateUserInput = updateUserSchema.parse(dataToValidate);
            
            const updateData = {
                id: userId,
                ...(validatedData.email !== undefined && { email: validatedData.email }),
                ...(validatedData.username !== undefined && { username: validatedData.username }),
                ...(validatedData.password !== undefined && { 
                    password: await generateHashPassword(validatedData.password) 
                }),
                ...(validatedData.interest_types !== undefined && { 
                    interest_types: validatedData.interest_types 
                })
            };
            
            const result = await service.execute(updateData);
    
            response.json(result);
        } catch (error: any) {
            response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})
        }
    }
}