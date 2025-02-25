import { prisma } from "../../PrismaHandler";


export class GetEventsService {
    async execute(): Promise<any> {

        const allEvents = await prisma.event.findMany({
            include: { user: true }
        })

        return allEvents
    }
}