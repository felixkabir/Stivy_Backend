import { Request, Response } from "express";
import { CreateUserService } from "../../services/user-services/CreateUserService";
import { generateHashPassword } from "../../helpers/generateHashPassword";
import { deleteFile } from "../../helpers/deleteFile";
import { CreateUserInput, createUserSchema } from "../../Schema/createUserSchema";
import { z } from "zod"; 
import { InternalServerError, StivyError, ValidationError } from "../../error";

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<any> {
        const service = new CreateUserService();

        try {
            // Validate and parse input data
            const validatedData: CreateUserInput = createUserSchema.parse(request.body);

            // Parse interest_types from string to array
            let interestTypes: string[] = [];
            try {
                if (validatedData.interest_types) {
                    const parsed = JSON.parse(validatedData.interest_types.replace(/'/g, '"'));
                    if (Array.isArray(parsed)) {
                        interestTypes = parsed;
                    }
                }
            } catch (e) {
                console.warn("Failed to parse interest_types", e);
                throw new ValidationError("Formato inválido para interesses");
            }

            const result = await service.execute({
                username: validatedData.username,
                email: validatedData.email,
                interest_types: interestTypes,
                gender: validatedData.gender, 
                file_url: String(request.file?.path),
                file_key: String(request.file?.filename),
                password: await generateHashPassword(validatedData.password),
            });

            return response.status(201).json({
                success: true,
                data: result
            });
            
        } catch (error) {
            // Clean up uploaded file if error occurs
            if (request.file?.filename) {
                deleteFile(String(request.file.filename)).catch(e => {
                    console.error("Failed to delete file:", e);
                });
            }

            if (error instanceof z.ZodError) {
                const validationError = new ValidationError(error.errors[0].message);
                return response.status(validationError.statusCode).json(validationError.toJSON());
            }

            if (error instanceof StivyError) {
                return response.status(error.statusCode).json(error.toJSON());
            }

            console.error('Unexpected error:', error);
            const internalError = new InternalServerError();
            return response.status(internalError.statusCode).json(internalError.toJSON());
        }
    }
}