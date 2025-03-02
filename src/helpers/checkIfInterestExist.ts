import { prisma } from "../PrismaHandler";


export async function checkIfInterestExist(type: string): Promise<boolean> {

    const interest = await prisma.interest.findMany({
        where: { interest_type: type }
    })

    if (interest && interest.length > 0) {
        return true
    } else {
        return false
    }
}