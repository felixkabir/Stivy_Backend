import { prisma } from "../../PrismaHandler";


type NotificationTypeRequest = {
    creatorId: string;
    createdForId: string;
    content: string;
}

export class CreateNotificationService {
    async execute({ createdForId, creatorId, content }: NotificationTypeRequest): Promise<void> {

        await prisma.notification.create({
            data: {
                createdForId,
                creatorId,
                content
            }
        })
    }
}