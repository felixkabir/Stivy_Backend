import createHttpError from "http-errors"
import { prisma } from "../../PrismaHandler"
import { UserResponse } from "../../Types"

type UserTypeRequest = {
    userId?: string
}

export class GetUserService {
    async execute({ userId }: UserTypeRequest): Promise<any> {      

        if (userId) {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: { 
                    agencies:{
                        include:{
                            models:true,
                            creator: true,
                            Post: true,
                        }
                } }
            })
            if (user) {
                return user                
            }

            return null

        } else {
            const users = await prisma.user.findMany({
                include: { 
                    agencies:{
                        include:{
                            models:true,
                            creator: true,
                            Post: true,
                        }
                 }}
            })

            return users
        }
    }
}