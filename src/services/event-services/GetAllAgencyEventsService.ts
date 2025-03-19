import { prisma } from "../../PrismaHandler";

type EventTypeRequest = {
    agencyId: string
}

export class GetAllAgencyEventsService {
    async execute({ agencyId }: EventTypeRequest): Promise<any> {

        const allAgencyEvents = await prisma.eventEntity.findMany({
            where: { agencyId },
            orderBy: { created_at: "asc" },
            include: { agency: true, Reaction: true }
        })

        return allAgencyEvents
    }
}