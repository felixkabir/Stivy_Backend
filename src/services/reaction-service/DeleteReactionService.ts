import { prisma } from "../../PrismaHandler";

type ReactionTypeRequest = {
    userId: string;
    postId?: string;
    eventId?: string;
};

export class DeleteReactionService {
    async execute({ userId, postId, eventId }: ReactionTypeRequest): Promise<any> {
        if (!postId && !userId) {
            throw new Error("É necessário fornecer um postId ou userID.");
        }

        const deletedReaction = await prisma.reaction.deleteMany({
            where: {
                userId,
                postId: postId || undefined,
                eventId: eventId || undefined,
            }
        });

        return deletedReaction;
    }
}
