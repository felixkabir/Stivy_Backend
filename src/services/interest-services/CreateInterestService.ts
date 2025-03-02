import { prisma } from "../../PrismaHandler";

type InterestTypeRequest = {
    type: string;
    name: string
}

export class CreateInterestService {
    async execute({ type, name }: InterestTypeRequest): Promise<any> {

        await prisma.interest.create({
            data: {
                name: name,
                interest_type: type
            }
        })
    }
}