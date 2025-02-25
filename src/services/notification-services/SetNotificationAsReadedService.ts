import { prisma } from "../../PrismaHandler";

type NotificationTypeRequest = {
    userId: string;
}

export class SetNotificationAsReadedService {
    async execute({ userId }: NotificationTypeRequest): Promise<void> {

        await prisma.notification.updateMany({
            where: { createdForId: userId },
            data: { is_readed: true }
        })
    }
}