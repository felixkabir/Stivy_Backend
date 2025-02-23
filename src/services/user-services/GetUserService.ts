import createHttpError from "http-errors"
import { prisma } from "../../PrismaHandler"
import { UserResponse } from "../../Types"

type UserTypeRequest = {
    userId?: string
}

export class GetUserService {
    async execute({ userId }: UserTypeRequest): Promise<UserResponse | UserResponse[] | null> {      

        if (userId) {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            })
            if (user) {
                return user                
            }

            return null

        } else {
            const users = await prisma.user.findMany()

            return users
        }
    }
}