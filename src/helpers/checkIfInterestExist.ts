import { prisma } from "../PrismaHandler";


export async function checkIfInterestExist(type: "MODEL" | "MODEL_FREELANCE" | "PHOTOGRAPH" | "PHOTOGRAPH_FREELANCE" | "MODE_LOVER"): Promise<boolean> {

    const interest = await prisma.interest.findUnique({
        where: { type }
    })

    if (interest) {
        return true
    } else {
        return false
    }
}