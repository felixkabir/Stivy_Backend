import { prisma } from "../../PrismaHandler";
import { UserType } from "../../Types";
import { GetUserService } from "./GetUserService";

type UpdateUserTypeRequest = Partial<Omit<UserType, "password">>

export class UpdateUserService {
    async execute({ id, email, username, file_key, file_url }: UpdateUserTypeRequest): Promise<any> {

        const user = new GetUserService().execute({ userId: id })

        if (!user) {
            return null
        }

        await prisma.user.update({
            where: { id },
            data: {
                email,
                username,
                file_key,
                file_url
            }
        })
    }
}