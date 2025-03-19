import { prisma } from "../../PrismaHandler";


export class GetEventsService {
    async execute(): Promise<any> {

        const allEvents = await prisma.eventEntity.findMany({
            include: { user: true, Reaction: true ,agency: true },
            orderBy: { created_at: "asc" }
        })

        return allEvents
    }
}