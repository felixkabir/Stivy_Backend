import { prisma } from "../../PrismaHandler"


type UserTypeRequest = {
    userId: string
}

export class GetUserAgencyService {
    async execute({ userId }: UserTypeRequest):Promise<any> {

        const [allUserAgencies, total] = await prisma.$transaction([
            prisma.agency.findMany({
                where: { userId },
                include: { creator: true }
            }),

            prisma.agency.count({
                where: { userId }
            })
        ])

        return {
            allUserAgencies,
            totalOfUserAgencies: total
        }
    }
}