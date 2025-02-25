import { prisma } from "../../PrismaHandler";


type NotificationTypeRequest = {
    userId: string;
}

export class GetUserNotificationsService {
    async execute({ userId }: NotificationTypeRequest): Promise<any> {

        const notifications = await prisma.notification.findMany({
            where: { createdForId: userId },
            orderBy: { created_at: "asc" },
            include: { creator: true }
        })

        return notifications
    }
}