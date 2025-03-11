import { prisma } from "../../PrismaHandler";


export class GetEventReactionsService {
    async execute(eventId: string): Promise<number> {

        const eventsReactions = await prisma.reaction.count({
            where: { eventId: eventId }
        })

        return eventsReactions
    }
}