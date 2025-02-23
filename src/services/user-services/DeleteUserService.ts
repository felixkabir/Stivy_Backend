import createHttpError from "http-errors";
import { deleteFile } from "../../helpers/deleteFile";
import { prisma } from "../../PrismaHandler";


type DeleteUserTypeRequest = {
    userId: string;
}

export class DeleteUserService {
    async execute({ userId }: DeleteUserTypeRequest): Promise<any> {

        try {
            const userToDelete = await prisma.user.delete({
                where: { id: userId },
            })

            if (userToDelete) {
                await deleteFile(String(userToDelete.file_key))   
            }
            
        } catch (error: any) {
            throw createHttpError(404, `Erro ao deletar usuario ${error}`)
        }

    }
}