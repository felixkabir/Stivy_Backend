import { Request, Response } from "express";
import { LoginService } from "../../services/auth-services/login";


export class LoginController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body

        const service = new LoginService()

        const result = await service.execute({ email, password })

        if (result == null) {
            response.status(404).json({message: "Email ou senha incorretos"})
            return            
        }

        response.json(result)
    }
}