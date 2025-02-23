import createHttpError from "http-errors"
import { prisma } from "../../PrismaHandler"

type UserTypeRequest = {
    userId?: string
}

export class GetUserService {
    async execute({ userId }: UserTypeRequest): Promise<any> {      

        if (userId) {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            })

            return user

        } else {
            const users = await prisma.user.findMany()

            return users
        }
    }
}