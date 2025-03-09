import { prisma } from "../../PrismaHandler";


type ReactionTypeRequest = {
    userId: string;
    postId?: string;
    eventId?: string;
}


export class CreateReactionService {
    async execute({ userId, postId, eventId }: ReactionTypeRequest): Promise<any> {

        const newReaction = await prisma.reaction.create({
            data: {
                userId: userId,
                postId,
                eventId
            }
        })

        return newReaction
    }
}