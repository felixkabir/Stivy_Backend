import { Request, Response } from "express";
import { GetUserService } from "../../services/user-services/GetUserService";
import { validate } from "uuid";


export class GetUserController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new GetUserService()

        if (userId && !validate(userId)) {
            response.status(400).json({message: "Invalid Id"})
            return
        }

        const result = await service.execute({
            userId
        })

        if(result === null) {
            response.status(404).json({message: "User not found"})
        } else {
            response.json(result)
        }
    }
}