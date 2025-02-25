import { prisma } from "../../PrismaHandler";


type UserUnreadedNotificationTypeRequest = {
    userId: string;
}

export class CountUserUnreadedNotificationsService {
    async execute({ userId }: UserUnreadedNotificationTypeRequest): Promise<number> {

        const totalOfUnreadedUserNotifications = await prisma.notification.count({
            where: { createdForId: userId, is_readed: false }
        })

        return totalOfUnreadedUserNotifications
    }
}