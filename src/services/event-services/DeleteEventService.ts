import { deleteFile } from "../../helpers/deleteFile";
import { prisma } from "../../PrismaHandler";


type DeleteEventTypeRequest = {
    eventId: string;
}


export class DeleteEventService {
    async execute({ eventId }: DeleteEventTypeRequest): Promise<any> {

        const event = await prisma.event.findUnique({
            where: { id: eventId }
        })

        if (event) {
            await deleteFile(String(event.file_key))
            await prisma.event.delete({ where: { id: event.id }})
        } else {
            return event
        }
    }
}