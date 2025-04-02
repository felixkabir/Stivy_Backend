import { prisma } from "../../PrismaHandler";
import { UserType } from "../../Types";
import { GetUserService } from "./GetUserService";

type UpdateUserTypeRequest = Partial<Omit<UserType, "file_key" | "file_url">>

export class UpdateUserService {
    async execute({ id, email, username ,password}: UpdateUserTypeRequest): Promise<any> {

        const user = await new GetUserService().execute({ userId: id })


        if (!user) {
            return null
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                email,
                username,
                password
            },

            select: {
                id: true,
                created_at: true,
                username: true,
                email: true,
                file_url: true,
            }
        })

        return updatedUser
    }
}