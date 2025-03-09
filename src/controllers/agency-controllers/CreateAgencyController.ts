import { Request, Response } from "express";
import { CreateAgencyService } from "../../services/agency-services/CreateAgencyService";
import { deleteFile } from "../../helpers/deleteFile";
import { createAgencyInput, createAgencySchema } from "../../Schema/createAgencySchema";
import { ZodError } from "zod";


export class CreateAgencyController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        try {
            if (!userId) {
                await deleteFile(String(request.file?.filename))
                response.status(400).json({ message: "Id is required!" })
                return
            }

            const validatedData: createAgencyInput = createAgencySchema.parse(request.body)

            const service = new CreateAgencyService()

            const result = await service.execute({
                userId: String(userId),
                name: validatedData.name,
                contact: validatedData.contact,
                file_key: String(request.file?.filename),
                file_url: String(request.file?.path)
            })

            response.json(result)

        } catch (error: any) {
            if (error instanceof ZodError) {
                response.status(400).json({error: `${error.errors[0].message}`})
            } else {
                response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` })
            }
        }
    }
}