import { prisma } from "../PrismaHandler";
import { CreateInterestService } from "../services/interest-services/CreateInterestService";
import { InterestType } from "../Types";


export async function checkIfInterestExist({ name, type }: InterestType): Promise<boolean> {
    const interestService = new CreateInterestService()

    const interest = await prisma.interest.findMany({
        where: { interest_type: type, name: name }
    })

    if (interest && interest.length > 0) {
        return true
    } else {
        await interestService.execute({ name, type })
        return false
    }
}