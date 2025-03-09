import { prisma } from "../../PrismaHandler";
import { UserResponse, UserType } from "../../Types";

type UserTypeRequest = Omit<UserType, "id" | "created_at">

export class CreateUserService {
    async execute({ username, email, password, file_key, file_url }: UserTypeRequest): Promise<UserResponse | any> {
        
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