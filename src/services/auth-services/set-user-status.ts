import { prisma } from "../../PrismaHandler";
import { GetUserByEmailService } from "../user-services/GetUserByEmailService";


type UserStatusTypeRequest = {
    email: string;
    status: boolean;
}

export class SetUserStatusService {
    async execute({ email, status }: UserStatusTypeRequest): Promise<void> {

        const user = await new GetUserByEmailService().execute(email)

        await prisma.user.update({
            where: { id: user?.id },
            data: { online_status: status }
        })
    }
}