import { Interest } from "@prisma/client";
import { prisma } from "../../PrismaHandler";


export class GetinterestsService {
    async execute(): Promise<Interest[]> {

        const allInterests = await prisma.interest.findMany()

        return allInterests
    }
}