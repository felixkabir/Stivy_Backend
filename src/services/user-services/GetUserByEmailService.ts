import { prisma } from "../../PrismaHandler";
import { UserResponse } from "../../Types";


export class GetUserByEmailService {
    async execute(email: string): Promise<Omit<UserResponse, "online_status"> | null> {

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if(!user) return null

        return user
    }
}