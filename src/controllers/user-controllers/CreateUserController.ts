import { Request, Response } from "express";
import { CreateUserService } from "../../services/user-services/CreateUserService";
import { generateHashPassword } from "../../helpers/generateHashPassword";
import { deleteFile } from "../../helpers/deleteFile";
import { CreateUserInput, createUserSchema } from "../../Schema/createUserSchema";
import { z } from "zod";


export class CreateUserController {
    async handle(request: Request, response: Response): Promise<any> {
        const service = new CreateUserService()

        try {

            const validatedData: CreateUserInput = createUserSchema.parse(request.body)

            if (!validatedData) {
                throw new Error("Dados incorrectos")
            }
            
            const result = await service.execute({
                username: validatedData.username,
                email: validatedData.email,
                interest_types: validatedData.interest_types,
                gender: validatedData.gender, 
                file_url: String(request.file?.path),
                file_key: String(request.file?.filename),
                password: await generateHashPassword(validatedData.password)
            })

            response.json(result)            
        } catch (error) {
            if (error instanceof z.ZodError) {
                deleteFile(String(request.file?.filename))
                response.status(400).json({error: `${error.errors[0].message}`})
            } else {
                deleteFile(String(request.file?.filename))
                response.status(500).json({message: `Ocorreu um erro inesperado: ${error}`})
            }
        }
    }
}