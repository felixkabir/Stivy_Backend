import { prisma } from "../../PrismaHandler";


type AgencyPostTypeRequest = {
    agencyId: string;
}

export class GetAgencyPostsService {
    async execute({ agencyId }: AgencyPostTypeRequest): Promise<any> {

        const posts = await prisma.post.findMany({
            where: { agencyId: agencyId },
            include: { agency: true, file_entity: true, Reaction: true }
        })

        return posts
    }
}