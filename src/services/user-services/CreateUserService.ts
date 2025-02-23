import { prisma } from "../../PrismaHandler";
import { UserType } from "../../Types";

type UserTypeRequest = Omit<UserType, "id">

export class CreateUserService {
    async execute({ username, email, password, file_key, file_url }: UserTypeRequest): Promise<any> {
        
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
                file_key,
                file_url
            }
        })

        return newUser
    }
}