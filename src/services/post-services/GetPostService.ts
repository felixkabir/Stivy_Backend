import { prisma } from "../../PrismaHandler";


type PostTypeRequest = {
    postId: string;
}

export class GetPostService {
    async execute({ postId }: PostTypeRequest): Promise<any> {

        if (postId) {
            const post = await prisma.post.findUnique({
                where: { id: postId },
                include: { file_entity: true, user: true, Reaction: true, agency: true, }
            })

            return post
        }

        const allPosts = await prisma.post.findMany({
            orderBy: { created_at: "asc" },
            include: { file_entity: true, user: true, Reaction: true,agency: true }
        })

        return allPosts
    }
}