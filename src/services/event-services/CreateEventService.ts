import { prisma } from "../../PrismaHandler";
import { EventType } from "../../Types";

type EventTypeRequest = Omit<EventType, "id" | "created_at">

export class CreateEventService {
    async execute({ name, start_date, end_date, userId, file_key, file_url }: EventTypeRequest): Promise<any> {

        const newEvent = await prisma.eventEntity.create({
            data: {
                end_date,
                name,
                start_date,
                userId,
                file_key,
                file_url,
            }
        })

        return newEvent
    }
}