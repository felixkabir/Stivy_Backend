import { Request, Response } from "express";
import { LogoutService } from "../../services/auth-services/logout";


export class LogoutController {
    async handle(request: Request, response: Response) {
        const { email } = request.body

        const service = new LogoutService()

        const result = await service.execute({ email: String(email) })

        response.json(result)
    }
}