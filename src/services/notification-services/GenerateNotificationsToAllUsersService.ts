import { User } from "@prisma/client";
import { prisma } from "../../PrismaHandler";
import { CreateNotificationService } from "./CreateNotificationService";
import Socket from "../../sockets/index"

type GenerateNotificationToAllUsersTypeRequest = {
    creatorId: string;
    content: string;
    users: User[]
}

export class GenerateNotificationsToAllUsersService {
    async execute({ creatorId, users, content }: GenerateNotificationToAllUsersTypeRequest): Promise<any> {
        
        if (users.length) {
            const creator = await prisma.user.findUnique({ where: {id: creatorId }})

            for (const destiny of users) {
                if (creator && creator.id !== destiny.id) {
                    await new CreateNotificationService().execute({
                        creatorId: creator.id,
                        createdForId: destiny.id,
                        content
                    })
                }
            }

            Socket.sendNotification()
        }
    }
}