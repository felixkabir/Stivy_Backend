import { prisma } from "../../PrismaHandler";


type UserPostTypeRequest = {
    userId: string;
}

export class GetUserPostsService {
    async execute({ userId }: UserPostTypeRequest): Promise<any> {

        const posts = await prisma.post.findMany({
            where: { userId: userId },
            include: { user: true, file_entity: true  }
        })

        return posts
    }
}