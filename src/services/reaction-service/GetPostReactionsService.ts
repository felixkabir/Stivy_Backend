import { prisma } from "../../PrismaHandler";


export class GetPostReactionsService {
    async execute(postId: string): Promise<number> {

        const postReactions = await prisma.reaction.count({
            where: { postId: postId }
        })

        return postReactions
    }
}