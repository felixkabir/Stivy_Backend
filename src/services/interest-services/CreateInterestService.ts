import { prisma } from "../../PrismaHandler";

type InterestTypeRequest = {
    type: "MODEL" | "MODEL_FREELANCE" | "PHOTOGRAPH" | "PHOTOGRAPH_FREELANCE" | "MODE_LOVER";
    name: string
}

export class CreateInterestService {
    async execute({ type, name }: InterestTypeRequest): Promise<any> {

        await prisma.interest.create({
            data: {
                name,
                type
            }
        })
    }
}