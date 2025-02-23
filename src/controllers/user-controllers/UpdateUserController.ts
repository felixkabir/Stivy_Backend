import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user-services/UpdateUserService";
import { deleteFile } from "../../helpers/deleteFile";
import { validate } from "uuid";


export class UpdateUserController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params
        const { email, username } = request.body

        const service = new UpdateUserService()

        if (!userId) {
            deleteFile(String(request.file?.filename))
            response.status(400).json({message: "Please, enter the user id to update"})
            return
        }

        if(userId && !validate(userId)) {
            deleteFile(String(request.file?.filename))
            response.status(400).json({message: "Please, enter the user id to update"})
            return
        }

        const result = await service.execute({
            id: userId,
            email,
            username,
        })

        response.json(result)
    }
}