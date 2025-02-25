import { prisma } from "../../PrismaHandler";

type EventTypeRequest = {
    userId: string
}

export class GetAllUserEventsService {
    async execute({ userId }: EventTypeRequest): Promise<any> {

        const allUserEvents = await prisma.event.findMany({
            where: { userId }
        })

        return allUserEvents
    }
}