import { Request, Response } from "express";
import { CreateUserService } from "../../services/user-services/CreateUserService";
import { generateHashPassword } from "../../helpers/generateHashPassword";
import createHttpError from "http-errors";
import { deleteFile } from "../../helpers/deleteFile";


export class CreateUserController {
    async handle(request: Request, response: Response): Promise<any> {
        const { username, email, password } = request.body

        const service = new CreateUserService()

        if (username.length > 0 && email.length > 0 && password.length > 0) {
            const result = await service.execute({
                username,
                email,
                file_url: String(request.file?.path),
                file_key: String(request.file?.filename),
                password: await generateHashPassword(password)
            })
    
            response.json(result)      
        } else {
            // Deletando arquivos caso der algum erro
            await deleteFile(String(request.file?.filename))

            response.status(400).json({message: "Por favor, preencha todos os campos"})
        }

    }
}