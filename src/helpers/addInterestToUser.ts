import { UserInterest } from "@prisma/client";
import { prisma } from "../PrismaHandler";


export async function addInterestToUser(user_id: string, interest_id: string): Promise<UserInterest> {
    if (interest_id === "DEFAULT" || interest_id == null) {
        const defaultInterest = await prisma.interest.findMany({
            where: { interest_type: "MODE_LOVER"}
        })

        const userInterest = await prisma.userInterest.create({
            data: {
                interestId: defaultInterest[0].id,
                userId: user_id
            }
        })

        return userInterest
    }

    const userInterest = await prisma.userInterest.create({
        data: {
            interestId: interest_id,
            userId: user_id
        }
    })

    return userInterest
}