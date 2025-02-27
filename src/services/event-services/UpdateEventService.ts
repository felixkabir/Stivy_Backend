import { prisma } from "../../PrismaHandler";
import { EventType } from "../../Types";

type EventTypeRequest = Omit<EventType, "created_at" | "userId">

export class UpdateEventService {
    async execute({ id, name, start_date, end_date, file_key, file_url }: EventTypeRequest): Promise<any> {
        const event = await prisma.eventEntity.findUnique({ where: { id } })

        if (event) {
            const newEvent = await prisma.eventEntity.update({
                where: { id },

                data: {
                    end_date: end_date ? end_date : event.end_date,
                    name: name ? name : event.name,
                    start_date: start_date ? start_date : event.start_date,
                    file_key: file_key ? file_key : event.file_key,
                    file_url: file_url ? file_url : event.file_url,
                }
            })
        }

    }
}